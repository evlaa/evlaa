import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    save(){
      this.get('selection').save().then((selection)=>{
        this.sendAction('new', selection);
      }, function(error){
        console.log('Saving error !', error);
      });
    }
  }
});
