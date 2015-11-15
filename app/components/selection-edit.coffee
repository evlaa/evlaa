`import Ember from 'ember';`

selectionEdit = Ember.Component.extend(
  actions:
    click: (photo)->
      @set('photo', photo)
      console.log 'photo selected ! ', photo
)


`export default selectionEdit`
