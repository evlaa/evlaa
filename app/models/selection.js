import DS from 'ember-data';

export default DS.Model.extend({
  collection: DS.belongsTo('collection'),
  email: DS.attr('string', { defaultValue: '' })
});
