`import Ember from 'ember';`
`import $ from 'jquery';`





PhotoLayout = Ember.Component.extend
  resized: ->
    @computeSize()
    @generateLayout()
  created: Ember.on('didInsertElement', ->
    console.log 'new PhotoLayout !'
    @computeSize()
    @generateLayout()
    @resize_listener = =>
      Ember.run.debounce(this, this.resized, 500)
    $(window).on('resize', @resize_listener)
  )
  deleted: Ember.on('willDestroyElement', ->
    console.log 'delete PhotoLayout !'
    $(window).off('resize', @resize_listener)
  )
  computeSize: ->
    # @set('margin', 2)
    # @set('zoom', 0.5) #TODO default ?
    @set('view-width', $(@element).width())
    @set('view-height', $(window).height()) # TODO allow to constrain height ?
  generateLayout: ->
    console.log(
      'new layout ',
      @get('view-width'),
      @get('view-height'),
      @get('zoom'),
      @get('margin')
    )
    layout = new Layout(
      @get('view-width'),
      @get('view-height'),
      @get('zoom')*1.0,
      @get('margin')*1
    )
    this.get('photos').then (photos)=>
      photos.forEach (photo)->
        layout.add({
          photo: photo
          w: photo.get('width')
          h: photo.get('height')
        })
      items = layout.getItems()
      console.log items
      this.set('items', items)
  observer: Ember.observer 'photos.[]', ->
    @generateLayout()
  actions:
    click: (photo)->
      console.log('click !')
      this.sendAction('click', photo)

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
    ratio_threshold = @_layout.ratio_threshold()
    ratio = @ratio_with_margin(
      @_objects_ratio,
      @_objects.length,
      @_layout._margin
    )
    return ratio
    if ratio > ratio_threshold
      ratio
    else
      ratio_threshold
  height: ->
    return @_layout._width / @ratio()
  add: (object)->
    if @_objects.length == 0
      @_objects_ratio = @object_ratio(object)
    else
      @_objects_ratio += @object_ratio(object)
    @_objects.push(object)
    # console.log 'add', object, 'new_ratio_internal:', @_objects_ratio,
    # 'ratio', @ratio(), 'new_height', @height()
  getItems: (offset_y)->
    height = @height()
    items = []
    offset_x = 0
    for object in  @_objects
      width = @object_ratio(object) * height
      # item = new Item(object, offset_x, offset_y, width, height)
      item = new Item(
        object,
        Math.round(offset_x),
        Math.round(offset_y),
        Math.round(width),
        Math.round(height)
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
