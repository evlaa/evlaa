`import Ember from 'ember'`

PhotoViewerComponent = Ember.Component.extend(
  attributeBindings: [ 'style' ],
  style: Ember.computed 'width', 'height', ->
    console.log 'change style photo viewer !', @get('width')
    #! TODO convert int !
    Ember.String.htmlSafe(
      "width: #{@get('width')}px;height: #{@get('height')}px;"
    )
  photo_width: Ember.computed(
    'content_width',
    'content_height',
    'width',
    'height', ->
      @compute_sizes()[0]
  )
  photo_height: Ember.computed(
    'content_width',
    'content_height',
    'width',
    'height', ->
      @compute_sizes()[1]
  )
  compute_sizes: ->
    @resize_to_fit(
      @get('content_width'),
      @get('content_height'),
      @get('width'),
      @get('height'),
    )
  resize_to_fit: (x,y,mx,my)->
    if (x/y) < (mx/my)
      [x * my / y, my]
    else
      [mx, y * mx / x]
  content_top: Ember.computed 'height', 'photo_height', ->
    (@get('height') - @get('photo_height')) /2
  content_left: Ember.computed 'width', 'photo_width', ->
    (@get('width') - @get('photo_width')) /2
  actions:
    background: ->
      console.log @get('width'), @get('height')
      @sendAction 'background'

)

`export default PhotoViewerComponent`
