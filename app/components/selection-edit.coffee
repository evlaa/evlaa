`import Ember from 'ember';`
`import ResizeAware from 'ember-resize/mixins/resize-aware';`

selectionEdit = Ember.Component.extend(ResizeAware,
  classNames: [ 'selection-edit' ]
  init: ->
    @_super()
    @setSizes()
  setSizes: ->
    @set 'width', $(window).innerWidth()
    @set 'height', $(window).innerHeight()
  debouncedDidResize: ->
    @setSizes()
  actions:
    click: (photo)->
      @sendAction 'view_photo', @get('selection'), photo
)
`export default selectionEdit`
