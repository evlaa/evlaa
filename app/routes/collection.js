import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    console.log('collection', params.id);
    return this.store.query('collection', { id: params.id });
  }
});
