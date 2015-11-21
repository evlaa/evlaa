`import DS from 'ember-data';`
`import Ember from 'ember';`

Model = DS.Model.extend({
  init: ->
    @_super()
    # Photoswipe and photolayout !
    @w = @get('width')
    @h = @get('height')
    @src = @get('url')
  collection: DS.belongsTo('collection'),
  notes: DS.hasMany('notes'),
  url: DS.attr('string'),
  width: DS.attr('number'),
  height: DS.attr('number'),
})

`export default Model;`
