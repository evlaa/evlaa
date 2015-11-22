`import Ember from 'ember'`

RatingStarsComponent = Ember.Component.extend(
  indexes: Ember.computed ->
    return [1,2,3,4,5]
  clear_on_click: false
  actions:
    select: (rating)->
      if @get('clear_on_click') && @get('rating') == rating
        @set('rating', null)
      else
        @set('rating', rating)
      @sendAction 'change', @get('rating')
)

`export default RatingStarsComponent`
