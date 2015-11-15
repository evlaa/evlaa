`import Ember from 'ember'`

selectionNew =  Ember.Component.extend(
  created: Ember.on('didInsertElement', ->
    @$('#selection-new-email').focus()
  ),
  actions:
    save: ->
      this.set('loading', true)
      this.get('selection').save().then ((selection)=>
        this.sendAction('new', selection)
      ), (error)->
        this.set('loading', false)
        console.log('Saving error !', error)
)
`export default selectionNew`
