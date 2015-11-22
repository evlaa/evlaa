`import Ember from 'ember'`

Route = Ember.Route.extend(
  model: (params)->
    promise = this.store.find('selection', params.selection_id)
    this.store.query_paginated(
      'note',
      { selection_id: params.selection_id }
    )
    promise.then (selection)=>
      this.store.query_paginated(
        'photo',
        { collection_id: selection.get('collection').get('id') }
      )
    return promise
  actions:
    view_photo: (selection, photo)->
      this.transitionTo('selection.photo', selection, photo)
)
`export default Route`
