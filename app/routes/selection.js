import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.find('selection', params.id);
  }
});
    // this.store.find('selection', params.id).then(function(selection){
    //   selection.get('collection').then(function(collection){
    //     console.log('collection', collection);
    //     console.log('collection', collection.photos());
    //     // collection.get('photos').then(function(photos){
    //     //   console.log('photos', photos);
    //     // });
    //   });
    // });
    // return new Ember.RSVP.Promise((resolve, reject)=>{
    //     console.log('selection loaded : ', selection.get('collection.id'));
    //     resolve(Ember.RSVP.hash({
    //       selection: selection,
    //       photos: this.store.query('photo', { collection_id: selection.get('collection.id') })
    //     }));
    //   }, reject);
//     });
//   }
// });
