`import Ember from 'ember'`

PhotoSwipeComponent = Ember.Component.extend(
  init: ->
    @_super()
  photo_changed: Ember.observer 'photo', ->
    return @display(@get('photo')) if @get('photo')?
    console.log 'Photo changed but empty !'
    #!TODO Close !
  index: Ember.computed 'photo', 'photos', ->
    @get('photos').indexOf(@get('photo'))
  params: Ember.computed 'index', ->
    {
      history: false
      index: @get('index')
      showHideOpacity: false
      getThumbBoundsFn: (index)->
        return { x: 0, y: 0, w: 20 }
      showAnimationDuration: 0
      hideAnimationDuration: 0
    }
  items: Ember.computed 'photos', ->
    items = []
    @get('photos').forEach (photo)->
      items.push(photo)
    items
  photoswipe_index: ->
    @get('photoswipe').getCurrentIndex()
  photoswipe_current: ->
    @get('photos').objectAt(@photoswipe_index())
  display: ->
    if @get('photoswipe')?
      if @photoswipe_index() != @get('index')
        @get('photoswipe').goTo(@get('index'))
      return
    photoswipe = new PhotoSwipe(
      @$('.pswp')[0]
      PhotoSwipeUI_Default,
      @get('items'),
      @get('params')
    )
    @set 'photoswipe', photoswipe
    photoswipe.init()
    photoswipe.listen 'destroy', =>
      @set 'photo'
      @set 'photoswipe'
    photoswipe.listen 'afterChange', =>
      @set('photo', @photoswipe_current())
)

`export default PhotoSwipeComponent`
