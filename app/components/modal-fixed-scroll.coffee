`import Ember from 'ember'`
`import $ from 'jquery'`

ModalFixedScroll = Ember.Component.extend(
  created: Ember.on 'didInsertElement', ->
    $window = $(window)
    @$element = $(@element)
    @$element.css('position', 'absolute')
    @top = $window.scrollTop()
    @$element.css('top', @top)
    @$element.css('left', 0)
)

`export default ModalFixedScroll`
