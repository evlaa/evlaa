`import Ember from 'ember'`

RatingStarComponent = Ember.Component.extend(
  tagName: 'a'
  init: ->
    @_super()
    @on 'click', =>
      @sendAction('click', @get('index'))
  selected: Ember.computed 'rating', 'index', ->
    @get('index') <= @get('rating')
)

`export default RatingStarComponent`
