import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    save(){
      this.set('loading', true)
      this.get('selection').save().then((selection)=>{
        this.sendAction('new', selection);
      }, function(error){
        this.set('loading', false)
        console.log('Saving error !', error);
      });
    }
  }
});
