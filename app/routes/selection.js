import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    var promise = this.store.find('selection', params.id);
    promise.then((selection)=>{
      this.store.query_paginated('photo', { collection_id: selection.get('collection').get('id') });
    });
    return promise;
  }
});
