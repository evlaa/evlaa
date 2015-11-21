`import Ember from 'ember'`
`import ResizeAware from 'ember-resize/mixins/resize-aware';`

PhotoShowComponent = Ember.Component.extend(ResizeAware,
  needs: ['store']
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
  next: Ember.computed 'index', 'photos.[]', ->
    @get('photos').objectAt(@get('index')+1)
  previous: Ember.computed 'index', 'photos.[]', ->
    @get('photos').objectAt(@get('index')-1)
  viewer_height: Ember.computed 'height', ->
    @get('height') - 52
  store: Ember.computed 'selection', ->
    @get('selection.store')
  photo_next: Ember.computed 'photos', 'index', ->
    @get('photos').objectAt(@get('index') +1)
  note: Ember.computed 'photo', 'selection', ->
    note = @get('selection').note_for(@get('photo'))
    console.log 'promise: ', note._result
    note.then (res)->
      console.log 'promise: ', note
      console.log 'note loaded !', res
    return note
  actions:
    rate: (rating)->
      @get('note').then (note)->
        console.log 'note', note
        note.set('note', rating)
        note.save()
    close: ->
      @sendAction 'close', @get('selection'), @get('photo')
)

`export default PhotoShowComponent`
