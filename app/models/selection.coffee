`import Ember from 'ember'`
`import DS from 'ember-data';`

Model = DS.Model.extend(
  collection: DS.belongsTo('collection')
  notes: DS.hasMany('notes')
  email: DS.attr('string', { defaultValue: '' })
  note_for: (photo)->
    promise = new Ember.RSVP.Promise (resolve, reject)=>
      @store.query('note', {
        selection_id: @get('id'),
        photo_id: photo.get('id')
      }).then (notes)=>
        if notes.get('length') > 0
          resolve(notes.get('firstObject'))
        else
          resolve(@store.createRecord('note', selection: this, photo: photo))
    DS.PromiseObject.create(promise: promise)
)

`export default Model;`
