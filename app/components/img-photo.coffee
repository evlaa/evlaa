`import Ember from 'ember'`

ImgPhotoComponent = Ember.Component.extend(
  tagName: 'img'
  classNames: [ 'img-photo' ]
  attributeBindings: [ 'src', 'width', 'height', 'data-id']
  'data-id': Ember.computed 'photo', ->
    @get('photo').get('id')
  src: Ember.computed 'photo.url', ->
    @get('photo').get('url')
)

`export default ImgPhotoComponent`
