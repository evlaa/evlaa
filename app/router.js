import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('collection', { path: 'collections/:id' }, function(){
    this.route('new-selection', { path: '/selections/new' });
  });
  this.route('selection', { path: 'selections/:id' });
});

export default Router;
