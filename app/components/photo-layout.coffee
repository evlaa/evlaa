`import Ember from 'ember';`
`import $ from 'jquery';`

PhotoLayout = Ember.Component.extend
  attributeBindings: [ 'style' ],
  classNames: [ 'photo-layout' ]
  init: ->
    @_super()
    @scroll_listener = =>
      Ember.run.debounce(this, @set_items, 20)
    $(window).scroll(@scroll_listener)
    @new_layout()
  deleted: Ember.on('willDestroyElement', ->
    $(window).off('scroll', @scroll_listener)
  )
  width_changed: Ember.observer 'width', ->
    @set('layout', null)
    @set_items()
    @new_layout()
  photo_changed: Ember.observer 'photos', ->
    @new_layout()
  process_photo_queue: ->
    for [1..10]
      photo = @photo_queue.shift()
      if photo?
        @future_layout.add(photo)
      else
        @set('loading', false)
        @set('layout', @future_layout)
        @set_items()
        return
    setTimeout((=>
      @process_photo_queue()
    ), 0)
  new_layout: ->
    previous_loading = @get('loading')
    @set('loading', true)
    @future_layout = new Layout(
      @get('width'),
      @get('height'),
      @get('zoom')*1.0,
      @get('margin')*1
    )
    @photo_queue =  []
    @get('photos').forEach (photo)=>
      @photo_queue.push(photo)
    @process_photo_queue() unless previous_loading
  generateLayout: ->
    layout = new Layout(
      @get('width'),
      @get('height'),
      @get('zoom')*1.0,
      @get('margin')*1
    )
    @get('photos').forEach (photo)->
      layout.add(photo)
    @set('layout', layout)
  style: Ember.computed 'layout',  ->
    return Ember.String.htmlSafe('') unless @get('layout')
    return Ember.String.htmlSafe(
      "position: relative;min-height: #{@get('layout').height()}px;"
    )
  position: ->
    position = 0
    if @element
      position = Math.abs($(window).scrollTop() - $(@element).offset().top)
  set_items: ->
    # start = new Date().getTime()
    return @set('items', []) unless @get('layout')?
    position = @position()
    @set 'items', @get('layout').getItems(
      position - 0.5 * @get('height')
      position + 1.5 * @get('height')
    )
    # time = new Date().getTime() - start
    # console.log 'set_items !', time
`export default PhotoLayout;`

class Layout
  constructor: (@_width, @_height, @_zoom, @_margin = 0.0)->
    @_ratio =  @_width / @_height
    @_width =  @_width * 1.0
    @_height =  @_height * 1.0
    @_margin =  @_margin * 1.0
    @_current_line = new Line(this)
    @_lines = [@_current_line]
  ratio_threshold: ->
    @_ratio / @_zoom
  add: (object)->
    if @_current_line.accept(object)
      @_current_line.add(object)
    else
      @_current_line = new Line(this)
      @_lines.push(@_current_line)
      @_current_line.add(object)
  getItems: (start=0, end)->
    items = []
    offset_y = 0
    for line in @_lines
      height = line.height()
      if offset_y < start
        offset_y += height + @_margin
        continue
      for item in  line.getItems(offset_y)
        items.push(item)
      offset_y += height + @_margin
      if end? and offset_y >= end
        break
    items
  height: ->
    height = 0
    for line in @_lines
      height += line.height()
    height += (@_lines.length - 1) * @_margin
    height

class Line
  constructor: (@_layout)->
    @_objects = []
  accept: (object)->
    return true if @_objects.length == 0
    return true if @calculate_ratio_with(object) <= @_layout.ratio_threshold()
    false
  ratio: ->
    @ratio_with_margin(
      @_objects_ratio,
      @_objects.length,
      @_layout._margin
    )
  height: ->
    return @_layout._width / @ratio()
  add: (object)->
    if @_objects.length == 0
      @_objects_ratio = @object_ratio(object)
    else
      @_objects_ratio += @object_ratio(object)
    @_objects.push(object)
  getItems: (offset_y)->
    return [] if @_objects.length == 0
    height = @height()
    items = []
    offset_x = 0
    for object in  @_objects
      width = @object_ratio(object) * height
      # item = new Item(object, offset_x, offset_y, width, height)
      item = new Item(
        object,
        Math.floor(offset_x),
        Math.floor(offset_y),
        Math.floor(width),
        Math.floor(height)
      )
      items.push(item)
      offset_x += width + @_layout._margin
    items
  calculate_ratio_with: (object)->
    ratio = @object_ratio(object)
    if @_objects.length == 0
      ratio
    else
      return @ratio_with_margin(
        @_objects_ratio + ratio,
        @_objects.length + 1,
        @_layout._margin
      )
  ratio_with_margin: (ratio, n, margin)->
    margins = (n*1.0-1.0)*margin
    ratio * @_layout._width / (@_layout._width - margins)
  object_ratio: (object)->
    object.w / object.h

class Item
  constructor: (@_object, @x, @y, @w, @h)->
