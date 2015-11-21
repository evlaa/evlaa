`import Ember from 'ember';`
`import ResizeAware from 'ember-resize/mixins/resize-aware';`

selectionEdit = Ember.Component.extend(ResizeAware,
  classNames: [ 'selection-edit' ]
  init: ->
    @_super()
    @setSizes()
  setSizes: ->
    @set 'width', $(window).innerWidth()
    @set 'height', $(window).innerHeight()
  debouncedDidResize: ->
    @setSizes()
  photos: Ember.computed 'selection.collection.photos.[]', ->
    @get('selection.collection.photos')
  index: Ember.computed 'photo', 'photos.[]', ->
    @get('photos').indexOf(@get('photo'))
  photo_next: Ember.computed 'photos', 'index', ->
    @get('photos').objectAt(@get('index')+1)
  note: Ember.computed 'photo', 'selection', ->
    return null unless @get('photo')
    return @get('selection').note_for(@get('photo'))
  actions:
    rate: (rating)->
      @get('note').then (note)->
        note.set('note', rating)
        note.save()
    click: (photo)->
      @set('photo', photo)
)
`export default selectionEdit`
