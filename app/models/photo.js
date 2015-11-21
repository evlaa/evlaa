import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  collection: DS.belongsTo('collection'),
  notes: DS.hasMany('notes'),
  url: DS.attr('string'),
  width: DS.attr('number'),
  height: DS.attr('number'),
});
