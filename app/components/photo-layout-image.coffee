`import Ember from 'ember'`

PhotoLayoutImageComponent = Ember.Component.extend(
#   tagName: 'img'
#   classNames: [ 'photo-layout-image' ]
#   # attributeBindings: [ 'src', 'width', 'height', 'style' ]
#   # attributeBindings: [ 'src', 'width', 'height' ]
#   photo: Ember.computed 'item', ->
#     @item._object
#   src: Ember.computed 'photo.url', ->
#     @get('photo').get('url')
#   width: Ember.computed 'item', ->
#     console.log this
#     @get('item').w
#   height: Ember.computed 'item', ->
#     @get('item').h
#   style: Ember.computed 'item',  ->
#     Ember.String.htmlSafe(
#       "position: absolute;left: #{@get('item').x}px;top: #{@get('item').y}px;"
#     )
#   actions:
#     click: ->
#       alert 'ICI !'
)

`export default PhotoLayoutImageComponent`
