`import Ember from 'ember'`

Route = Ember.Route.extend
  actions: {
    new: (selection)->
      this.store.query_paginated('note',
        selection_id: selection.get('id')
      )
      this.transitionTo('selection', selection)
    }
  model: ()->
    return this.store.createRecord('selection',
      collection: this.modelFor('collection')
    )

`export default Route`
