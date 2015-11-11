import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  selections: DS.hasMany('selection'),
  photos: DS.hasMany('photo'),
});
