`import DS from 'ember-data'`

Note = DS.Model.extend {
  selection: DS.belongsTo('selection')
  photo: DS.belongsTo('photo')
  note: DS.attr('number')
}

`export default Note`
