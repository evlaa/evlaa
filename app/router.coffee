`import Ember from 'ember';`
`import config from './config/environment';`

Router = Ember.Router.extend
  location: config.locationType

Router.map ->
  this.route 'collection', { path: 'collections/:id' }, ->
    this.route 'new-selection', { path: '/selections/new' }
  this.route 'selection', { path: 'selections/:selection_id' }, ->
    this.route 'photo', { path: '/photo/:id' }

`export default Router;`
