`import Ember from 'ember'`

DivAbsoluteComponent = Ember.Component.extend(
  attributeBindings: [ 'style' ]
  style: Ember.computed 'width', 'height', 'top', 'left', ->
    #! TODO convert int !
    return Ember.String.htmlSafe(
      "position: absolute;left: #{@get('left')}px;top: #{@get('top')}px;width: #{@get('width')}px;height: #{@get('height')}px;"
    )
)

`export default DivAbsoluteComponent`
