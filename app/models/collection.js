import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  init(){
    this._super();
    this.raw_photos = Ember.A([]);
    this.raw_photos.push({ label: 'test' });
    // this.raw_photos.push({ label: 'test1' });
    //console.log('new collection', this.get('id'));
    setInterval(()=>{
      console.log('Add photo? ');
      Ember.run(()=>{
        this.raw_photos.push({label: 'ici ?'});
      });
      console.log(this.get('photos'));
    }, 1000);

    this.addObserver('photos.@each', function(){
      console.log('photos changed!');
    });
  },
  photos: function(){
    console.log('ici photos ? ');
    return this.raw_photos;
  }.property(),
  name: DS.attr('string'),
  selections: DS.hasMany('selection'),
});
