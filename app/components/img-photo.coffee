`import Ember from 'ember'`

ImgPhotoComponent = Ember.Component.extend(
  tagName: 'img'
  attributeBindings: [ 'src', 'width', 'height']
  src: Ember.computed 'photo.url', ->
    @get('photo').get('url')
)

`export default ImgPhotoComponent`
