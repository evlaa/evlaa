`import Ember from 'ember'`

PhotoLayoutImageComponent = Ember.Component.extend(
  tagName: 'img'
  created: Ember.on('didInsertElement', ->
    @$element = @$(@element)
    @$element.attr('width', @item.w)
    @$element.attr('height', @item.h)
    @$element.attr('style', "left: #{@item.x}px;top: #{@item.y}px;")
    @click = =>
      @sendAction('click', @item)
    @$element.on 'click', @click
  )
  deleted: Ember.on('willDestroyElement', ->
    console.log 'remove handler'
    @$element.off 'click', @click
  )
)

`export default PhotoLayoutImageComponent`
