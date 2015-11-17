`import DS from 'ember-data';`
Adapter = DS.RESTAdapter.extend(
  # host: 'http://localhost:5000'
  host: 'http://192.168.0.13:5000'
)
`export default Adapter;`
