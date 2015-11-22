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
  notes_filtered: Ember.computed 'note_filter', 'selection.notes.@each.note', ->
    @get('selection.notes').filter (note)=>
      note.get('note') == @get('note_filter')
  photos: Ember.computed(
    'notes_filtered.[]',
    'note_filter',
    'selection.collection.photos.[]',
    ->
      if @get('note_filter')?
        @get('notes_filtered').map (note)->
          note.get('photo').content
      else
        @get('selection.collection.photos')
  )
  index: Ember.computed 'photo', 'photos.[]', ->
    @get('photos').indexOf(@get('photo'))
  photo_next: Ember.computed 'photos', 'index', ->
    @get('photos').objectAt(@get('index')+1)
  note: Ember.computed 'photo', 'selection', ->
    return null unless @get('photo')
    return @get('selection').note_for(@get('photo'))
  actions:
    note: (value, old_value)->
      @get('note').content.save()
    click: (photo)->
      @set('photo', photo)
)
`export default selectionEdit`
