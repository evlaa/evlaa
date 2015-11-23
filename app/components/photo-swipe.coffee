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
      getThumbBoundsFn: (index)=>
        photo = @get('photos').objectAt(index)
        # photo_id = @get('photo').get('id')
        $photo = $(".photo-layout-image[data-id=#{photo.get('id')}]") if photo
        if photo && $photo.length > 0
          position = $photo.offset()
          console.log position
          return {
            x: position.left,
            y: position.top,
            w: $photo.width()
          }
        return {
          x: $(window).innerWidth()/2,
          y: $(window).innerHeight()/2 + $(window).scrollTop(),
          w: 1
        }
      # showAnimationDuration: 200
      # hideAnimationDuration: 200
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
