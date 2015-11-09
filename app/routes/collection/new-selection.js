import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    new(selection){
      this.transitionTo('selection', selection);
    }
  },
  model() {
    return this.store.createRecord(
        'selection',
        {
          collection: this.modelFor('collection')
        }
    );
  }
});
