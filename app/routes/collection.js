import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    var promise = this.store.find('collection', params.id);
    promise.then(()=>{
      this.store.query('photo', { collection_id: params.id });
    });
    return promise
  }
});
