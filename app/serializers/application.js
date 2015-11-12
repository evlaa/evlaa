import DS from 'ember-data';
export default DS.RESTSerializer.extend({
  keyForRelationship: function(key) {
    return key + '_id';
  }
});
