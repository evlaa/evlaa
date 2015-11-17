`import Ember from 'ember';`

selectionEdit = Ember.Component.extend(
  classNames: [ 'selection-edit' ]
  created: Ember.on('didInsertElement', ->
    @resized()
    @resize_listener = =>
      Ember.run.debounce(this, this.resized, 500)
    $(window).on('resize', @resize_listener)
    @scroll_listener = =>
      return unless @photo
      Ember.run(this, this.scrolled)
    $(window).on 'scroll', @scroll_listener
  )
  resized: ->
    @set 'width', $(window).innerWidth()
    @set 'height', $(window).innerHeight()
  scrolled: ->
    @set('photo')
  deleted: Ember.on('willDestroyElement', ->
    $(window).off('resize', @resize_listener)
    $(window).off('scroll', @scroll_listener)
  )
  index: Ember.computed 'photo', 'selection.collection.photos.[]', ->
    console.log @get('selection.collection.photos').indexOf(@get('photo'))
    @get('selection.collection.photos').indexOf(@get('photo'))

  next: Ember.computed 'index', 'selection.collection.photos.[]', ->
    @get('selection.collection.photos').objectAt(@get('index')+1)
  previous: Ember.computed 'index', 'selection.collection.photos.[]', ->
    @get('selection.collection.photos').objectAt(@get('index')-1)

  viewer_height: Ember.computed 'height', ->
    # @get('height') - 44
    @get('height')
  actions:
    next: ->
      @set('photo', @get('next'))
    previous: ->
      @set('photo', @get('previous'))
    close: ->
      @set('photo')
    click: (photo)->
      @set('photo', photo)
)
`export default selectionEdit`
