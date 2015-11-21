`import Ember from 'ember'`

RatingStarsComponent = Ember.Component.extend(
  indexes: Ember.computed ->
    return [1,2,3,4,5]
  actions:
    select: (rating)->
      @sendAction 'change', rating
)

`export default RatingStarsComponent`
