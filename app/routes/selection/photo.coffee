`import Ember from 'ember';`

Route = Ember.Route.extend
  model: (params)->
    @store.find('photo', params.id)
  setupController: (controller, model)->
    @_super(controller,model)
    controller.set('selection', @modelFor('selection'))
  actions:
    close: (selection, photo)->
      this.transitionTo('selection', selection)

`export default Route;`
