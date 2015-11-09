import DS from 'ember-data';
export default DS.RESTSerializer.extend({
  keyForRelationship: function(key, relationship) {
    return key + '_id';
  }
});
