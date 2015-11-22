"use strict";
/* jshint ignore:start */

/* jshint ignore:end */

define('epica/adapters/application', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  var Adapter;

  Adapter = DS['default'].RESTAdapter.extend({
    host: 'http://192.168.0.13:5000'
  });

  exports['default'] = Adapter;;

});
define('epica/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'epica/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  var App;

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });
  Ember['default'].$.ajaxSetup({ crossDomain: true });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
define('epica/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'epica/config/environment'], function (exports, AppVersionComponent, config) {

  'use strict';

  var _config$APP = config['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;

  exports['default'] = AppVersionComponent['default'].extend({
    version: version,
    name: name
  });

});
define('epica/components/div-absolute', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var DivAbsoluteComponent;

  DivAbsoluteComponent = Ember['default'].Component.extend({
    attributeBindings: ['style'],
    style: Ember['default'].computed('width', 'height', 'top', 'left', function () {
      return Ember['default'].String.htmlSafe("position: absolute;" + ("left: " + this.get('left') + "px;") + ("top: " + this.get('top') + "px;") + ("width: " + this.get('width') + "px;") + ("height: " + this.get('height') + "px;"));
    })
  });

  exports['default'] = DivAbsoluteComponent;

});
define('epica/components/fa-icon', ['exports', 'ember-cli-font-awesome/components/fa-icon'], function (exports, fa_icon) {

	'use strict';



	exports['default'] = fa_icon['default'];

});
define('epica/components/fa-list-icon', ['exports', 'ember-cli-font-awesome/components/fa-list-icon'], function (exports, fa_list_icon) {

	'use strict';



	exports['default'] = fa_list_icon['default'];

});
define('epica/components/fa-list', ['exports', 'ember-cli-font-awesome/components/fa-list'], function (exports, fa_list) {

	'use strict';



	exports['default'] = fa_list['default'];

});
define('epica/components/fa-stack', ['exports', 'ember-cli-font-awesome/components/fa-stack'], function (exports, fa_stack) {

	'use strict';



	exports['default'] = fa_stack['default'];

});
define('epica/components/img-photo', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var ImgPhotoComponent;

  ImgPhotoComponent = Ember['default'].Component.extend({
    tagName: 'img',
    classNames: ['img-photo'],
    attributeBindings: ['src', 'width', 'height'],
    src: Ember['default'].computed('photo.url', function () {
      return this.get('photo').get('url');
    })
  });

  exports['default'] = ImgPhotoComponent;

});
define('epica/components/input-rating', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	var InputRatingComponent;

	InputRatingComponent = Ember['default'].Component.extend();

	exports['default'] = InputRatingComponent;

});
define('epica/components/modal-fixed-scroll', ['exports', 'ember', 'jquery'], function (exports, Ember, $) {

  'use strict';

  var ModalFixedScroll;

  ModalFixedScroll = Ember['default'].Component.extend({
    created: Ember['default'].on('didInsertElement', function () {
      var $window;
      $window = $['default'](window);
      this.$element = $['default'](this.element);
      this.$element.css('position', 'absolute');
      this.top = $window.scrollTop();
      this.$element.css('top', this.top);
      return this.$element.css('left', 0);
    })
  });

  exports['default'] = ModalFixedScroll;

});
define('epica/components/photo-layout-image', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	var PhotoLayoutImageComponent;

	PhotoLayoutImageComponent = Ember['default'].Component.extend();

	exports['default'] = PhotoLayoutImageComponent;

});
define('epica/components/photo-layout', ['exports', 'ember', 'jquery'], function (exports, Ember, $) {

  'use strict';

  var Item, Layout, Line, PhotoLayout;

  PhotoLayout = Ember['default'].Component.extend({
    attributeBindings: ['style'],
    classNames: ['photo-layout'],
    init: function init() {
      this._super();
      this.scroll_listener = (function (_this) {
        return function () {
          return Ember['default'].run.debounce(_this, _this.scrolled, 50);
        };
      })(this);
      Em.run.scheduleOnce('afterRender', this, (function (_this) {
        return function () {
          return _this.generateLayout();
        };
      })(this));
      return $['default'](window).on('scroll', this.scroll_listener);
    },
    scrolled: function scrolled() {
      return this.set('position', Math.abs($['default'](window).scrollTop() - $['default'](this.element).offset().top));
    },
    deleted: Ember['default'].on('willDestroyElement', function () {
      return $['default'](window).off('scroll', this.scroll_listener);
    }),
    width_changed: Ember['default'].observer('width', function () {
      return Em.run.scheduleOnce('afterRender', this, (function (_this) {
        return function () {
          return _this.generateLayout();
        };
      })(this));
    }),
    photo_changed: Ember['default'].observer('photos', function () {
      return Em.run.scheduleOnce('afterRender', this, (function (_this) {
        return function () {
          return _this.generateLayout();
        };
      })(this));
    }),
    generateLayout: function generateLayout() {
      var layout;
      console.log('=> Generate layout !');
      layout = new Layout(this.get('width'), this.get('height'), this.get('zoom') * 1.0, this.get('margin') * 1);
      this.get('photos').forEach(function (photo) {
        return layout.add(photo);
      });
      return this.set('layout', layout);
    },
    style: Ember['default'].computed('layout', function () {
      if (!this.get('layout')) {
        return Ember['default'].String.htmlSafe('');
      }
      return Ember['default'].String.htmlSafe("position: relative;min-height: " + this.get('layout').height() + "px;");
    }),
    items: Ember['default'].computed('position', 'layout', function () {
      var items;
      if (this.get('layout') == null) {
        return [];
      }
      return items = this.get('layout').getItems(this.get('position') - 1 * this.get('height'), this.get('position') + 2 * this.get('height'));
    })
  });

  exports['default'] = PhotoLayout;;

  Layout = (function () {
    function Layout(_width, _height, _zoom, _margin) {
      this._width = _width;
      this._height = _height;
      this._zoom = _zoom;
      this._margin = _margin != null ? _margin : 0.0;
      this._ratio = this._width / this._height;
      this._width = this._width * 1.0;
      this._height = this._height * 1.0;
      this._margin = this._margin * 1.0;
      this._current_line = new Line(this);
      this._lines = [this._current_line];
    }

    Layout.prototype.ratio_threshold = function () {
      return this._ratio / this._zoom;
    };

    Layout.prototype.add = function (object) {
      if (this._current_line.accept(object)) {
        return this._current_line.add(object);
      } else {
        this._current_line = new Line(this);
        this._lines.push(this._current_line);
        return this._current_line.add(object);
      }
    };

    Layout.prototype.getItems = function (start, end) {
      var height, i, item, items, j, len, len1, line, offset_y, ref, ref1;
      if (start == null) {
        start = 0;
      }
      items = [];
      offset_y = 0;
      ref = this._lines;
      for (i = 0, len = ref.length; i < len; i++) {
        line = ref[i];
        height = line.height();
        if (offset_y < start) {
          offset_y += height + this._margin;
          continue;
        }
        ref1 = line.getItems(offset_y);
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          item = ref1[j];
          items.push(item);
        }
        offset_y += height + this._margin;
        if (end != null && offset_y >= end) {
          break;
        }
      }
      return items;
    };

    Layout.prototype.height = function () {
      var height, i, len, line, ref;
      height = 0;
      ref = this._lines;
      for (i = 0, len = ref.length; i < len; i++) {
        line = ref[i];
        height += line.height();
      }
      height += (this._lines.length - 1) * this._margin;
      return height;
    };

    return Layout;
  })();

  Line = (function () {
    function Line(_layout) {
      this._layout = _layout;
      this._objects = [];
    }

    Line.prototype.accept = function (object) {
      if (this._objects.length === 0) {
        return true;
      }
      if (this.calculate_ratio_with(object) <= this._layout.ratio_threshold()) {
        return true;
      }
      return false;
    };

    Line.prototype.ratio = function () {
      return this.ratio_with_margin(this._objects_ratio, this._objects.length, this._layout._margin);
    };

    Line.prototype.height = function () {
      return this._layout._width / this.ratio();
    };

    Line.prototype.add = function (object) {
      if (this._objects.length === 0) {
        this._objects_ratio = this.object_ratio(object);
      } else {
        this._objects_ratio += this.object_ratio(object);
      }
      return this._objects.push(object);
    };

    Line.prototype.getItems = function (offset_y) {
      var height, i, item, items, len, object, offset_x, ref, width;
      if (this._objects.length === 0) {
        return [];
      }
      height = this.height();
      items = [];
      offset_x = 0;
      ref = this._objects;
      for (i = 0, len = ref.length; i < len; i++) {
        object = ref[i];
        width = this.object_ratio(object) * height;
        item = new Item(object, Math.floor(offset_x), Math.floor(offset_y), Math.floor(width), Math.floor(height));
        items.push(item);
        offset_x += width + this._layout._margin;
      }
      return items;
    };

    Line.prototype.calculate_ratio_with = function (object) {
      var ratio;
      ratio = this.object_ratio(object);
      if (this._objects.length === 0) {
        return ratio;
      } else {
        return this.ratio_with_margin(this._objects_ratio + ratio, this._objects.length + 1, this._layout._margin);
      }
    };

    Line.prototype.ratio_with_margin = function (ratio, n, margin) {
      var margins;
      margins = (n * 1.0 - 1.0) * margin;
      return ratio * this._layout._width / (this._layout._width - margins);
    };

    Line.prototype.object_ratio = function (object) {
      return object.w / object.h;
    };

    return Line;
  })();

  Item = (function () {
    function Item(_object, x, y, w, h) {
      this._object = _object;
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
    }

    return Item;
  })();

});
define('epica/components/photo-show', ['exports', 'ember', 'ember-resize/mixins/resize-aware'], function (exports, Ember, ResizeAware) {

  'use strict';

  var PhotoShowComponent;

  PhotoShowComponent = Ember['default'].Component.extend(ResizeAware['default'], {
    needs: ['store'],
    init: function init() {
      this._super();
      return this.setSizes();
    },
    setSizes: function setSizes() {
      this.set('width', $(window).innerWidth());
      return this.set('height', $(window).innerHeight());
    },
    debouncedDidResize: function debouncedDidResize() {
      return this.setSizes();
    },
    photos: Ember['default'].computed('selection.collection.photos.[]', function () {
      return this.get('selection.collection.photos');
    }),
    index: Ember['default'].computed('photo', 'photos.[]', function () {
      return this.get('photos').indexOf(this.get('photo'));
    }),
    next: Ember['default'].computed('index', 'photos.[]', function () {
      return this.get('photos').objectAt(this.get('index') + 1);
    }),
    previous: Ember['default'].computed('index', 'photos.[]', function () {
      return this.get('photos').objectAt(this.get('index') - 1);
    }),
    viewer_height: Ember['default'].computed('height', function () {
      return this.get('height') - 52;
    }),
    store: Ember['default'].computed('selection', function () {
      return this.get('selection.store');
    }),
    photo_next: Ember['default'].computed('photos', 'index', function () {
      return this.get('photos').objectAt(this.get('index')(+1));
    }),
    note: Ember['default'].computed('photo', 'selection', function () {
      var note;
      note = this.get('selection').note_for(this.get('photo'));
      console.log('promise: ', note._result);
      note.then(function (res) {
        console.log('promise: ', note);
        return console.log('note loaded !', res);
      });
      return note;
    }),
    actions: {
      rate: function rate(rating) {
        return this.get('note').then(function (note) {
          console.log('note', note);
          note.set('note', rating);
          return note.save();
        });
      },
      close: function close() {
        return this.sendAction('close', this.get('selection'), this.get('photo'));
      }
    }
  });

  exports['default'] = PhotoShowComponent;

});
define('epica/components/photo-swipe', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var PhotoSwipeComponent;

  PhotoSwipeComponent = Ember['default'].Component.extend({
    init: function init() {
      return this._super();
    },
    photo_changed: Ember['default'].observer('photo', function () {
      if (this.get('photo') != null) {
        return this.display(this.get('photo'));
      }
      return console.log('Photo changed but empty !');
    }),
    index: Ember['default'].computed('photo', 'photos', function () {
      return this.get('photos').indexOf(this.get('photo'));
    }),
    params: Ember['default'].computed('index', function () {
      return {
        history: false,
        index: this.get('index'),
        showHideOpacity: false,
        getThumbBoundsFn: function getThumbBoundsFn(index) {
          return {
            x: 0,
            y: 0,
            w: 20
          };
        },
        showAnimationDuration: 0,
        hideAnimationDuration: 0
      };
    }),
    items: Ember['default'].computed('photos', function () {
      var items;
      items = [];
      this.get('photos').forEach(function (photo) {
        return items.push(photo);
      });
      return items;
    }),
    photoswipe_index: function photoswipe_index() {
      return this.get('photoswipe').getCurrentIndex();
    },
    photoswipe_current: function photoswipe_current() {
      return this.get('photos').objectAt(this.photoswipe_index());
    },
    display: function display() {
      var photoswipe;
      if (this.get('photoswipe') != null) {
        if (this.photoswipe_index() !== this.get('index')) {
          this.get('photoswipe').goTo(this.get('index'));
        }
        return;
      }
      photoswipe = new PhotoSwipe(this.$('.pswp')[0], PhotoSwipeUI_Default, this.get('items'), this.get('params'));
      this.set('photoswipe', photoswipe);
      photoswipe.init();
      photoswipe.listen('destroy', (function (_this) {
        return function () {
          _this.set('photo');
          return _this.set('photoswipe');
        };
      })(this));
      return photoswipe.listen('afterChange', (function (_this) {
        return function () {
          return _this.set('photo', _this.photoswipe_current());
        };
      })(this));
    }
  });

  exports['default'] = PhotoSwipeComponent;

});
define('epica/components/photo-viewer', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var PhotoViewerComponent;

  PhotoViewerComponent = Ember['default'].Component.extend({
    attributeBindings: ['style'],
    style: Ember['default'].computed('width', 'height', function () {
      console.log('change style photo viewer !', this.get('width'));
      return Ember['default'].String.htmlSafe("width: " + this.get('width') + "px;height: " + this.get('height') + "px;");
    }),
    photo_width: Ember['default'].computed('content_width', 'content_height', 'width', 'height', function () {
      return this.compute_sizes()[0];
    }),
    photo_height: Ember['default'].computed('content_width', 'content_height', 'width', 'height', function () {
      return this.compute_sizes()[1];
    }),
    compute_sizes: function compute_sizes() {
      return this.resize_to_fit(this.get('content_width'), this.get('content_height'), this.get('width'), this.get('height'));
    },
    resize_to_fit: function resize_to_fit(x, y, mx, my) {
      if (x / y < mx / my) {
        return [x * my / y, my];
      } else {
        return [mx, y * mx / x];
      }
    },
    content_top: Ember['default'].computed('height', 'photo_height', function () {
      return (this.get('height') - this.get('photo_height')) / 2;
    }),
    content_left: Ember['default'].computed('width', 'photo_width', function () {
      return (this.get('width') - this.get('photo_width')) / 2;
    }),
    actions: {
      background: function background() {
        return this.sendAction('background');
      }
    }
  });

  exports['default'] = PhotoViewerComponent;

});
define('epica/components/rating-star', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var RatingStarComponent;

  RatingStarComponent = Ember['default'].Component.extend({
    tagName: 'a',
    init: function init() {
      this._super();
      return this.on('click', (function (_this) {
        return function () {
          return _this.sendAction('click', _this.get('index'));
        };
      })(this));
    },
    selected: Ember['default'].computed('rating', 'index', function () {
      return this.get('index') <= this.get('rating');
    })
  });

  exports['default'] = RatingStarComponent;

});
define('epica/components/rating-stars', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var RatingStarsComponent;

  RatingStarsComponent = Ember['default'].Component.extend({
    indexes: Ember['default'].computed(function () {
      return [1, 2, 3, 4, 5];
    }),
    clear_on_click: false,
    actions: {
      select: function select(rating) {
        if (this.get('clear_on_click') && this.get('rating') === rating) {
          this.set('rating', null);
        } else {
          this.set('rating', rating);
        }
        return this.sendAction('change', this.get('rating'));
      }
    }
  });

  exports['default'] = RatingStarsComponent;

});
define('epica/components/selection-edit', ['exports', 'ember', 'ember-resize/mixins/resize-aware'], function (exports, Ember, ResizeAware) {

  'use strict';

  var selectionEdit;

  selectionEdit = Ember['default'].Component.extend(ResizeAware['default'], {
    classNames: ['selection-edit'],
    init: function init() {
      this._super();
      return this.setSizes();
    },
    setSizes: function setSizes() {
      this.set('width', $(window).innerWidth());
      return this.set('height', $(window).innerHeight());
    },
    debouncedDidResize: function debouncedDidResize() {
      return this.setSizes();
    },
    notes_filtered: Ember['default'].computed('note_filter', 'selection.notes.@each.note', function () {
      return this.get('selection.notes').filter((function (_this) {
        return function (note) {
          return note.get('note') === _this.get('note_filter');
        };
      })(this));
    }),
    photos: Ember['default'].computed('notes_filtered.[]', 'note_filter', 'selection.collection.photos.[]', function () {
      if (this.get('note_filter') != null) {
        return this.get('notes_filtered').map(function (note) {
          return note.get('photo').content;
        });
      } else {
        return this.get('selection.collection.photos');
      }
    }),
    index: Ember['default'].computed('photo', 'photos.[]', function () {
      return this.get('photos').indexOf(this.get('photo'));
    }),
    photo_next: Ember['default'].computed('photos', 'index', function () {
      return this.get('photos').objectAt(this.get('index') + 1);
    }),
    note: Ember['default'].computed('photo', 'selection', function () {
      if (!this.get('photo')) {
        return null;
      }
      return this.get('selection').note_for(this.get('photo'));
    }),
    actions: {
      note: function note(value, old_value) {
        return this.get('note').content.save();
      },
      click: function click(photo) {
        return this.set('photo', photo);
      }
    }
  });

  exports['default'] = selectionEdit;

});
define('epica/components/selection-new', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var selectionNew;

  selectionNew = Ember['default'].Component.extend({
    created: Ember['default'].on('didInsertElement', function () {
      return this.$('#selection-new-email').focus();
    }),
    init: function init() {
      this._super();
      return this.setSizes();
    },
    setSizes: function setSizes() {
      this.set('width', $(window).innerWidth());
      return this.set('height', $(window).innerHeight());
    },
    debouncedDidResize: function debouncedDidResize() {
      return this.setSizes();
    },
    actions: {
      save: function save() {
        this.set('loading', true);
        return this.get('selection').save().then((function (_this) {
          return function (selection) {
            return _this.sendAction('new', selection);
          };
        })(this), function (error) {
          this.set('loading', false);
          return console.log('Saving error !', error);
        });
      }
    }
  });

  exports['default'] = selectionNew;

});
define('epica/controllers/array', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('epica/controllers/object', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('epica/helpers/t', ['exports', 'ember-i18n/helper'], function (exports, helper) {

	'use strict';



	exports['default'] = helper['default'];

});
define('epica/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'epica/config/environment'], function (exports, initializerFactory, config) {

  'use strict';

  var _config$APP = config['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;

  exports['default'] = {
    name: 'App Version',
    initialize: initializerFactory['default'](name, version)
  };

});
define('epica/initializers/ember-i18n', ['exports', 'epica/instance-initializers/ember-i18n'], function (exports, instanceInitializer) {

  'use strict';

  exports['default'] = {
    name: instanceInitializer['default'].name,

    initialize: function initialize() {
      var application = arguments[1] || arguments[0]; // depending on Ember version
      if (application.instanceInitializer) {
        return;
      }

      instanceInitializer['default'].initialize(application);
    }
  };

});
define('epica/initializers/export-application-global', ['exports', 'ember', 'epica/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (config['default'].exportApplicationGlobal !== false) {
      var value = config['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember['default'].String.classify(config['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };

});
define('epica/initializers/resize', ['exports', 'ember-resize/services/resize', 'epica/config/environment'], function (exports, ResizeService, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];

    var resizeServiceDefaults = config['default'].resizeServiceDefaults;
    var injectionFactories = resizeServiceDefaults.injectionFactories;

    application.register('config:resize-service', resizeServiceDefaults, { instantiate: false });
    application.register('service:resize', ResizeService['default']);
    application.inject('service:resize', 'resizeServiceDefaults', 'config:resize-service');

    injectionFactories.forEach(function (factory) {
      application.inject(factory, 'resizeService', 'service:resize');
    });
  }

  exports['default'] = {
    name: 'resize',
    initialize: initialize
  };

});
define('epica/instance-initializers/ember-i18n', ['exports', 'ember', 'ember-i18n/legacy-helper', 'epica/config/environment'], function (exports, Ember, legacyHelper, ENV) {

  'use strict';

  exports['default'] = {
    name: 'ember-i18n',

    initialize: function initialize(instance) {
      if (legacyHelper['default'] != null) {
        Ember['default'].HTMLBars._registerHelper('t', legacyHelper['default']);
      }
    }
  };

});
define('epica/locales/fr/config', ['exports'], function (exports) {

  'use strict';

  // Ember-I18n includes configuration for common locales. Most users
  // can safely delete this file. Use it if you need to override behavior
  // for a locale or define behavior for a locale that Ember-I18n
  // doesn't know about.
  exports['default'] = {
    // rtl: [true|FALSE],
    //
    // pluralForm: function(count) {
    //   if (count === 0) { return 'zero'; }
    //   if (count === 1) { return 'one'; }
    //   if (count === 2) { return 'two'; }
    //   if (count < 5) { return 'few'; }
    //   if (count >= 5) { return 'many'; }
    //   return 'other';
    // }
  };

});
define('epica/locales/fr/translations', ['exports'], function (exports) {

  'use strict';

  exports['default'] = {
    'loading': 'chargement...',
    'welcome': 'Bienvenue !',
    'oups': 'Oups...',
    'error': 'Une erreur est survenue...',
    'placeholders': {
      'email': 'Email'
    },
    'selection': {
      'new': {
        'submit': 'Selectioner les photos'
      },
      'edit': {
        'done': 'J\'ai fini !'
      }
    }
  };

});
define('epica/mixins/resize-aware', ['exports', 'ember-resize/mixins/resize-aware'], function (exports, resize_aware) {

	'use strict';



	exports['default'] = resize_aware['default'];

});
define('epica/models/collection', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    name: DS['default'].attr('string'),
    selections: DS['default'].hasMany('selection'),
    photos: DS['default'].hasMany('photo')
  });

});
define('epica/models/note', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  var Note;

  Note = DS['default'].Model.extend({
    selection: DS['default'].belongsTo('selection'),
    photo: DS['default'].belongsTo('photo'),
    note: DS['default'].attr('number')
  });

  exports['default'] = Note;

});
define('epica/models/photo', ['exports', 'ember-data', 'ember'], function (exports, DS, Ember) {

  'use strict';

  var Model;

  Model = DS['default'].Model.extend({
    init: function init() {
      this._super();
      this.w = this.get('width');
      this.h = this.get('height');
      return this.src = this.get('url');
    },
    collection: DS['default'].belongsTo('collection'),
    notes: DS['default'].hasMany('notes'),
    url: DS['default'].attr('string'),
    width: DS['default'].attr('number'),
    height: DS['default'].attr('number')
  });

  exports['default'] = Model;;

});
define('epica/models/selection', ['exports', 'ember', 'ember-data'], function (exports, Ember, DS) {

  'use strict';

  var Model;

  Model = DS['default'].Model.extend({
    collection: DS['default'].belongsTo('collection'),
    notes: DS['default'].hasMany('notes'),
    email: DS['default'].attr('string', {
      defaultValue: ''
    }),
    note_for: function note_for(photo) {
      var promise;
      promise = new Ember['default'].RSVP.Promise((function (_this) {
        return function (resolve, reject) {
          return _this.store.query('note', {
            selection_id: _this.get('id'),
            photo_id: photo.get('id')
          }).then(function (notes) {
            if (notes.get('length') > 0) {
              return resolve(notes.get('firstObject'));
            } else {
              return resolve(_this.store.createRecord('note', {
                selection: _this,
                photo: photo
              }));
            }
          });
        };
      })(this));
      return DS['default'].PromiseObject.create({
        promise: promise
      });
    }
  });

  exports['default'] = Model;;

});
define('epica/router', ['exports', 'ember', 'epica/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router;

  Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {
    this.route('collection', {
      path: 'collections/:id'
    }, function () {
      return this.route('new-selection', {
        path: '/selections/new'
      });
    });
    return this.route('selection', {
      path: 'selections/:selection_id'
    }, function () {
      return this.route('photo', {
        path: '/photo/:id'
      });
    });
  });

  exports['default'] = Router;;

});
define('epica/routes/collection/new-selection', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    actions: {
      'new': function _new(selection) {
        this.transitionTo('selection', selection);
      }
    },
    model: function model() {
      return this.store.createRecord('selection', {
        collection: this.modelFor('collection')
      });
    }
  });

});
define('epica/routes/collection', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function model(params) {
      var _this = this;

      var promise = this.store.find('collection', params.id);
      promise.then(function () {
        _this.store.query_paginated('photo', { collection_id: params.id });
      });
      return promise;
    }
  });

});
define('epica/routes/selection/photo', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var Route;

  Route = Ember['default'].Route.extend({
    model: function model(params) {
      return this.store.find('photo', params.id);
    },
    setupController: function setupController(controller, model) {
      this._super(controller, model);
      return controller.set('selection', this.modelFor('selection'));
    },
    actions: {
      close: function close(selection, photo) {
        return this.transitionTo('selection', selection);
      }
    }
  });

  exports['default'] = Route;;

});
define('epica/routes/selection', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var Route;

  Route = Ember['default'].Route.extend({
    model: function model(params) {
      var promise;
      promise = this.store.find('selection', params.selection_id);
      this.store.query_paginated('note', {
        selection_id: params.selection_id
      });
      promise.then((function (_this) {
        return function (selection) {
          return _this.store.query_paginated('photo', {
            collection_id: selection.get('collection').get('id')
          });
        };
      })(this));
      return promise;
    },
    actions: {
      view_photo: function view_photo(selection, photo) {
        return this.transitionTo('selection.photo', selection, photo);
      }
    }
  });

  exports['default'] = Route;

});
define('epica/serializers/application', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].RESTSerializer.extend({
    keyForRelationship: function keyForRelationship(key) {
      return key + '_id';
    }
  });

});
define('epica/services/i18n', ['exports', 'ember-i18n/services/i18n'], function (exports, i18n) {

	'use strict';



	exports['default'] = i18n['default'];

});
define('epica/services/resize', ['exports', 'ember-resize/services/resize'], function (exports, resize) {

	'use strict';



	exports['default'] = resize['default'];

});
define('epica/services/store', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Store.extend({
    query_paginated: function query_paginated(object, query) {
      var _this = this;

      var page = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

      // console.log('paginated_query !', page);
      query['page'] = page;
      this.query(object, query).then(function (loaded) {
        if (loaded.content.length !== 0) {
          _this.query_paginated(object, query, page + 1);
        }
      });
    }
  });

});
define('epica/templates/application', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 10
          }
        },
        "moduleName": "epica/templates/application.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["content","outlet",["loc",[null,[1,0],[1,10]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('epica/templates/collection/new-selection', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 43
          }
        },
        "moduleName": "epica/templates/collection/new-selection.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["inline","selection-new",[],["selection",["subexpr","@mut",[["get","model",["loc",[null,[1,26],[1,31]]]]],[],[]],"new","new"],["loc",[null,[1,0],[1,43]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('epica/templates/collection', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 10
          }
        },
        "moduleName": "epica/templates/collection.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["content","outlet",["loc",[null,[1,0],[1,10]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('epica/templates/collection_error', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 239
          }
        },
        "moduleName": "epica/templates/collection_error.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","container");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row");
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","col-md-4 col-md-offset-4");
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","card card-margin-top");
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","card-block");
        var el6 = dom.createElement("h2");
        dom.setAttribute(el6,"class","card-title");
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("p");
        var el7 = dom.createElement("span");
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 0, 0, 0, 0]);
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [0]),0,0);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [1, 0]),0,0);
        return morphs;
      },
      statements: [
        ["inline","t",["oups"],[],["loc",[null,[1,159],[1,171]]]],
        ["inline","t",["error"],[],["loc",[null,[1,185],[1,198]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('epica/templates/collection_loading', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "topLevel": false,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 293
          }
        },
        "moduleName": "epica/templates/collection_loading.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","background-overlay");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","container");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row");
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","col-md-4 col-md-offset-4");
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","card card-margin-top card-white");
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","card-block");
        var el6 = dom.createElement("h2");
        dom.setAttribute(el6,"class","card-title");
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("p");
        var el7 = dom.createElement("span");
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [1, 0, 0, 0, 0]);
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [0]),0,0);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [1, 0]),0,0);
        return morphs;
      },
      statements: [
        ["inline","t",["welcome"],[],["loc",[null,[1,208],[1,223]]]],
        ["inline","t",["loading"],[],["loc",[null,[1,237],[1,252]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('epica/templates/components/div-absolute', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "epica/templates/components/div-absolute.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["content","yield",["loc",[null,[1,0],[1,9]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('epica/templates/components/img-photo', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 0
          }
        },
        "moduleName": "epica/templates/components/img-photo.hbs"
      },
      isEmpty: true,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }()));

});
define('epica/templates/components/input-rating', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 28
          }
        },
        "moduleName": "epica/templates/components/input-rating.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("a");
        dom.setAttribute(el1,"class","fa fa-star-o");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }()));

});
define('epica/templates/components/modal-fixed-scroll', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 9
          }
        },
        "moduleName": "epica/templates/components/modal-fixed-scroll.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["content","yield",["loc",[null,[1,0],[1,9]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('epica/templates/components/photo-layout', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "topLevel": null,
          "revision": "Ember@2.1.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 1,
              "column": 39
            }
          },
          "moduleName": "epica/templates/components/photo-layout.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [
          ["inline","yield",[["get","item",["loc",[null,[1,33],[1,37]]]]],[],["loc",[null,[1,25],[1,39]]]]
        ],
        locals: ["item"],
        templates: []
      };
    }());
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 48
          }
        },
        "moduleName": "epica/templates/components/photo-layout.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","each",[["get","items",["loc",[null,[1,8],[1,13]]]]],[],0,null,["loc",[null,[1,0],[1,48]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('epica/templates/components/photo-show', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "topLevel": false,
          "revision": "Ember@2.1.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 1,
              "column": 326
            }
          },
          "moduleName": "epica/templates/components/photo-show.hbs"
        },
        isEmpty: false,
        arity: 2,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
          morphs[1] = dom.createMorphAt(fragment,1,1,contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [
          ["inline","img-photo",[],["photo",["subexpr","@mut",[["get","photo",["loc",[null,[1,185],[1,190]]]]],[],[]],"width",["subexpr","@mut",[["get","photo_viewer_width",["loc",[null,[1,197],[1,215]]]]],[],[]],"height",["subexpr","@mut",[["get","photo_viewer_height",["loc",[null,[1,223],[1,242]]]]],[],[]]],["loc",[null,[1,167],[1,244]]]],
          ["inline","link-to",["","selection.photo",["get","selection",["loc",[null,[1,275],[1,284]]]],["get","next",["loc",[null,[1,285],[1,289]]]]],["replace",true,"class","link-absolute"],["loc",[null,[1,244],[1,326]]]]
        ],
        locals: ["photo_viewer_width","photo_viewer_height"],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "topLevel": null,
          "revision": "Ember@2.1.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 523
            },
            "end": {
              "line": 1,
              "column": 634
            }
          },
          "moduleName": "epica/templates/components/photo-show.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("i");
          dom.setAttribute(el1,"class","fa fa-close");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child2 = (function() {
      return {
        meta: {
          "topLevel": null,
          "revision": "Ember@2.1.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 646
            },
            "end": {
              "line": 1,
              "column": 734
            }
          },
          "moduleName": "epica/templates/components/photo-show.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [
          ["inline","rating-stars",[],["rating",["subexpr","@mut",[["get","note.note",["loc",[null,[1,680],[1,689]]]]],[],[]],"change","rate","class","photo-viewer-ratings"],["loc",[null,[1,658],[1,734]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "topLevel": false,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 741
          }
        },
        "moduleName": "epica/templates/components/photo-show.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        morphs[1] = dom.createMorphAt(fragment,1,1,contextualElement);
        morphs[2] = dom.createMorphAt(fragment,2,2,contextualElement);
        morphs[3] = dom.createMorphAt(fragment,3,3,contextualElement);
        morphs[4] = dom.createMorphAt(fragment,4,4,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","photo-viewer",[],["background","close","content_width",["subexpr","@mut",[["get","photo.width",["loc",[null,[1,49],[1,60]]]]],[],[]],"content_height",["subexpr","@mut",[["get","photo.height",["loc",[null,[1,76],[1,88]]]]],[],[]],"width",["subexpr","@mut",[["get","width",["loc",[null,[1,95],[1,100]]]]],[],[]],"height",["subexpr","@mut",[["get","viewer_height",["loc",[null,[1,108],[1,121]]]]],[],[]]],0,null,["loc",[null,[1,0],[1,343]]]],
        ["inline","link-to",["","selection.photo",["get","selection",["loc",[null,[1,374],[1,383]]]],["get","next",["loc",[null,[1,384],[1,388]]]]],["replace",true,"class","photo-viewer-next"],["loc",[null,[1,343],[1,429]]]],
        ["inline","link-to",["","selection.photo",["get","selection",["loc",[null,[1,460],[1,469]]]],["get","previous",["loc",[null,[1,470],[1,478]]]]],["replace",true,"class","photo-viewer-previous"],["loc",[null,[1,429],[1,523]]]],
        ["block","link-to",["selection",["get","selection",["loc",[null,[1,546],[1,555]]]]],["class","btn btn-lg btn-control photo-viewer-close"],1,null,["loc",[null,[1,523],[1,646]]]],
        ["block","if",[["get","note",["loc",[null,[1,652],[1,656]]]]],[],2,null,["loc",[null,[1,646],[1,741]]]]
      ],
      locals: [],
      templates: [child0, child1, child2]
    };
  }()));

});
define('epica/templates/components/photo-swipe', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "topLevel": false,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 60,
            "column": 0
          }
        },
        "moduleName": "epica/templates/components/photo-swipe.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment(" Root element of PhotoSwipe. Must have class pswp. ");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","pswp");
        dom.setAttribute(el1,"tabindex","-1");
        dom.setAttribute(el1,"role","dialog");
        dom.setAttribute(el1,"aria-hidden","true");
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment(" Background of PhotoSwipe.\n    It's a separate element, as animating opacity is faster than rgba(). ");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","pswp__bg");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment(" Slides wrapper with overflow:hidden. ");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","pswp__scroll-wrap");
        var el3 = dom.createTextNode("\n\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment(" Container that holds slides. PhotoSwipe keeps only 3 slides in DOM to save memory. ");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","pswp__container");
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment(" don't modify these 3 pswp__item elements, data is added later on ");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","pswp__item");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","pswp__item");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","pswp__item");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment(" Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. ");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","pswp__ui pswp__ui--hidden");
        var el4 = dom.createTextNode("\n\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","pswp__top-bar");
        var el5 = dom.createTextNode("\n\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("  Controls are self-explanatory. Order can be changed. ");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","pswp__counter");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("button");
        dom.setAttribute(el5,"class","pswp__button pswp__button--close");
        dom.setAttribute(el5,"title","Close (Esc)");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("button");
        dom.setAttribute(el5,"class","pswp__button pswp__button--zoom");
        dom.setAttribute(el5,"title","Zoom in/out");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment(" Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR ");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","pswp__preloader");
        var el6 = dom.createTextNode("\n            ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6,"class","pswp__preloader__icn");
        var el7 = dom.createTextNode("\n              ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7,"class","pswp__preloader__cut");
        var el8 = dom.createTextNode("\n                ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("div");
        dom.setAttribute(el8,"class","pswp__preloader__donut");
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n              ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","pswp__share-modal pswp__share-modal--hidden pswp__single-tap");
        var el5 = dom.createTextNode("\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","pswp__share-tooltip");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4,"class","pswp__button pswp__button--arrow--left");
        dom.setAttribute(el4,"title","Previous (arrow left)");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4,"class","pswp__button pswp__button--arrow--right");
        dom.setAttribute(el4,"title","Next (arrow right)");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","pswp__caption");
        var el5 = dom.createTextNode("\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","pswp__caption__center");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n      ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }()));

});
define('epica/templates/components/photo-viewer', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "topLevel": null,
          "revision": "Ember@2.1.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 115
            },
            "end": {
              "line": 1,
              "column": 238
            }
          },
          "moduleName": "epica/templates/components/photo-viewer.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [
          ["inline","yield",[["get","photo_width",["loc",[null,[1,212],[1,223]]]],["get","photo_height",["loc",[null,[1,224],[1,236]]]]],[],["loc",[null,[1,204],[1,238]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 261
          }
        },
        "moduleName": "epica/templates/components/photo-viewer.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","photo-viewer-wrapper");
        var el2 = dom.createElement("a");
        dom.setAttribute(el2,"href","");
        dom.setAttribute(el2,"class","background-transparent");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [0]);
        var morphs = new Array(2);
        morphs[0] = dom.createElementMorph(element1);
        morphs[1] = dom.createMorphAt(element0,1,1);
        return morphs;
      },
      statements: [
        ["element","action",["background"],["on","click"],["loc",[null,[1,45],[1,79]]]],
        ["block","div-absolute",[],["left",["subexpr","@mut",[["get","content_left",["loc",[null,[1,136],[1,148]]]]],[],[]],"top",["subexpr","@mut",[["get","content_top",["loc",[null,[1,153],[1,164]]]]],[],[]],"width",["subexpr","@mut",[["get","photo_width",["loc",[null,[1,171],[1,182]]]]],[],[]],"height",["subexpr","@mut",[["get","photo_height",["loc",[null,[1,190],[1,202]]]]],[],[]]],0,null,["loc",[null,[1,115],[1,255]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('epica/templates/components/rating-star', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "topLevel": null,
          "revision": "Ember@2.1.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 1,
              "column": 42
            }
          },
          "moduleName": "epica/templates/components/rating-star.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("i");
          dom.setAttribute(el1,"class","fa fa-star");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "topLevel": null,
          "revision": "Ember@2.1.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 42
            },
            "end": {
              "line": 1,
              "column": 78
            }
          },
          "moduleName": "epica/templates/components/rating-star.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("i");
          dom.setAttribute(el1,"class","fa fa-star-o");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 85
          }
        },
        "moduleName": "epica/templates/components/rating-star.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","if",[["get","selected",["loc",[null,[1,6],[1,14]]]]],[],0,1,["loc",[null,[1,0],[1,85]]]]
      ],
      locals: [],
      templates: [child0, child1]
    };
  }()));

});
define('epica/templates/components/rating-stars', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "topLevel": null,
          "revision": "Ember@2.1.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 1,
              "column": 115
            }
          },
          "moduleName": "epica/templates/components/rating-stars.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [
          ["inline","rating-star",[],["rating",["subexpr","@mut",[["get","rating",["loc",[null,[1,49],[1,55]]]]],[],[]],"index",["subexpr","@mut",[["get","index",["loc",[null,[1,62],[1,67]]]]],[],[]],"click","select","class","btn btn-lg btn-control"],["loc",[null,[1,28],[1,115]]]]
        ],
        locals: ["index"],
        templates: []
      };
    }());
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 124
          }
        },
        "moduleName": "epica/templates/components/rating-stars.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","each",[["get","indexes",["loc",[null,[1,8],[1,15]]]]],[],0,null,["loc",[null,[1,0],[1,124]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('epica/templates/components/selection-edit', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "topLevel": null,
          "revision": "Ember@2.1.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 295
            },
            "end": {
              "line": 1,
              "column": 385
            }
          },
          "moduleName": "epica/templates/components/selection-edit.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("h2");
          dom.setAttribute(el1,"class","card-title");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]),0,0);
          return morphs;
        },
        statements: [
          ["content","selection.collection.name",["loc",[null,[1,351],[1,380]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "topLevel": null,
          "revision": "Ember@2.1.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 385
            },
            "end": {
              "line": 1,
              "column": 436
            }
          },
          "moduleName": "epica/templates/components/selection-edit.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("h2");
          dom.setAttribute(el1,"class","card-title");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]),0,0);
          return morphs;
        },
        statements: [
          ["inline","t",["loading"],[],["loc",[null,[1,416],[1,431]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    var child2 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "topLevel": null,
            "revision": "Ember@2.1.0",
            "loc": {
              "source": null,
              "start": {
                "line": 1,
                "column": 563
              },
              "end": {
                "line": 1,
                "column": 769
              }
            },
            "moduleName": "epica/templates/components/selection-edit.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createElement("a");
            dom.setAttribute(el1,"href","");
            dom.setAttribute(el1,"class","link-absolute");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [0]);
            var morphs = new Array(2);
            morphs[0] = dom.createElementMorph(element0);
            morphs[1] = dom.createMorphAt(fragment,1,1,contextualElement);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [
            ["element","action",["click",["get","item._object",["loc",[null,[1,650],[1,662]]]]],["on","click"],["loc",[null,[1,633],[1,675]]]],
            ["inline","img-photo",[],["photo",["subexpr","@mut",[["get","item._object",["loc",[null,[1,728],[1,740]]]]],[],[]],"width",["subexpr","@mut",[["get","item.w",["loc",[null,[1,747],[1,753]]]]],[],[]],"height",["subexpr","@mut",[["get","item.h",["loc",[null,[1,761],[1,767]]]]],[],[]]],["loc",[null,[1,710],[1,769]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "topLevel": null,
          "revision": "Ember@2.1.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 473
            },
            "end": {
              "line": 1,
              "column": 786
            }
          },
          "moduleName": "epica/templates/components/selection-edit.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [
          ["block","div-absolute",[],["left",["subexpr","@mut",[["get","item.x",["loc",[null,[1,584],[1,590]]]]],[],[]],"top",["subexpr","@mut",[["get","item.y",["loc",[null,[1,595],[1,601]]]]],[],[]],"width",["subexpr","@mut",[["get","item.w",["loc",[null,[1,608],[1,614]]]]],[],[]],"height",["subexpr","@mut",[["get","item.h",["loc",[null,[1,622],[1,628]]]]],[],[]]],0,null,["loc",[null,[1,563],[1,786]]]]
        ],
        locals: ["item"],
        templates: [child0]
      };
    }());
    var child3 = (function() {
      return {
        meta: {
          "topLevel": null,
          "revision": "Ember@2.1.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 849
            },
            "end": {
              "line": 2,
              "column": 38
            }
          },
          "moduleName": "epica/templates/components/selection-edit.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode(" /\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [
          ["content","selection.collection.photos.length",["loc",[null,[2,0],[2,38]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    var child4 = (function() {
      return {
        meta: {
          "topLevel": null,
          "revision": "Ember@2.1.0",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 92
            },
            "end": {
              "line": 2,
              "column": 180
            }
          },
          "moduleName": "epica/templates/components/selection-edit.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [
          ["inline","rating-stars",[],["rating",["subexpr","@mut",[["get","note.note",["loc",[null,[2,126],[2,135]]]]],[],[]],"change","note","class","photo-viewer-ratings"],["loc",[null,[2,104],[2,180]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "topLevel": false,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 187
          }
        },
        "moduleName": "epica/templates/components/selection-edit.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","ratings-bar-wrapper");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","ratings-bar");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","container");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row");
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","col-md-4 col-md-offset-4");
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","card card-margin-top card-white");
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","card-block");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","total-indicator");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [3]);
        var morphs = new Array(7);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 0]),0,0);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [1, 0, 0, 0, 0]),0,0);
        morphs[2] = dom.createMorphAt(fragment,2,2,contextualElement);
        morphs[3] = dom.createMorphAt(element1,0,0);
        morphs[4] = dom.createMorphAt(element1,1,1);
        morphs[5] = dom.createMorphAt(fragment,4,4,contextualElement);
        morphs[6] = dom.createMorphAt(fragment,5,5,contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["inline","rating-stars",[],["rating",["subexpr","@mut",[["get","note_filter",["loc",[null,[1,80],[1,91]]]]],[],[]],"clear_on_click",true,"class","ratings-filter"],["loc",[null,[1,58],[1,136]]]],
        ["block","if",[["get","selection.collection.name",["loc",[null,[1,301],[1,326]]]]],[],0,1,["loc",[null,[1,295],[1,443]]]],
        ["block","photo-layout",[],["photos",["subexpr","@mut",[["get","photos",["loc",[null,[1,496],[1,502]]]]],[],[]],"zoom","0.15","width",["subexpr","@mut",[["get","width",["loc",[null,[1,521],[1,526]]]]],[],[]],"height",["subexpr","@mut",[["get","height",["loc",[null,[1,534],[1,540]]]]],[],[]],"margin","5"],2,null,["loc",[null,[1,473],[1,803]]]],
        ["content","photos.length",["loc",[null,[1,832],[1,849]]]],
        ["block","if",[["get","note_filter",["loc",[null,[1,855],[1,866]]]]],[],3,null,["loc",[null,[1,849],[2,45]]]],
        ["inline","photo-swipe",[],["photo",["subexpr","@mut",[["get","photo",["loc",[null,[2,71],[2,76]]]]],[],[]],"photos",["subexpr","@mut",[["get","photos",["loc",[null,[2,84],[2,90]]]]],[],[]]],["loc",[null,[2,51],[2,92]]]],
        ["block","if",[["get","note",["loc",[null,[2,98],[2,102]]]]],[],4,null,["loc",[null,[2,92],[2,187]]]]
      ],
      locals: [],
      templates: [child0, child1, child2, child3, child4]
    };
  }()));

});
define('epica/templates/components/selection-new', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "topLevel": null,
            "revision": "Ember@2.1.0",
            "loc": {
              "source": null,
              "start": {
                "line": 1,
                "column": 145
              },
              "end": {
                "line": 1,
                "column": 271
              }
            },
            "moduleName": "epica/templates/components/selection-new.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [
            ["inline","img-photo",[],["photo",["subexpr","@mut",[["get","item._object",["loc",[null,[1,230],[1,242]]]]],[],[]],"width",["subexpr","@mut",[["get","item.w",["loc",[null,[1,249],[1,255]]]]],[],[]],"height",["subexpr","@mut",[["get","item.h",["loc",[null,[1,263],[1,269]]]]],[],[]]],["loc",[null,[1,212],[1,271]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "topLevel": null,
          "revision": "Ember@2.1.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 34
            },
            "end": {
              "line": 1,
              "column": 288
            }
          },
          "moduleName": "epica/templates/components/selection-new.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [
          ["block","div-absolute",[],["left",["subexpr","@mut",[["get","item.x",["loc",[null,[1,166],[1,172]]]]],[],[]],"top",["subexpr","@mut",[["get","item.y",["loc",[null,[1,177],[1,183]]]]],[],[]],"width",["subexpr","@mut",[["get","item.w",["loc",[null,[1,190],[1,196]]]]],[],[]],"height",["subexpr","@mut",[["get","item.h",["loc",[null,[1,204],[1,210]]]]],[],[]]],0,null,["loc",[null,[1,145],[1,288]]]]
        ],
        locals: ["item"],
        templates: [child0]
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "topLevel": null,
          "revision": "Ember@2.1.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 557
            },
            "end": {
              "line": 1,
              "column": 622
            }
          },
          "moduleName": "epica/templates/components/selection-new.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("li");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]),0,0);
          return morphs;
        },
        statements: [
          ["content","s.name",["loc",[null,[1,607],[1,617]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "topLevel": false,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 1079
          }
        },
        "moduleName": "epica/templates/components/selection-new.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","selection-new-photos");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","background-overlay");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","container");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row");
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","col-md-4 col-md-offset-4");
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","card card-margin-top card-white");
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","card-block");
        var el6 = dom.createElement("h2");
        dom.setAttribute(el6,"class","card-title");
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("ul");
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("form");
        var el7 = dom.createElement("fieldset");
        dom.setAttribute(el7,"class","form-group");
        var el8 = dom.createElement("div");
        dom.setAttribute(el8,"class","input-group");
        var el9 = dom.createElement("div");
        dom.setAttribute(el9,"class","input-group-addon");
        var el10 = dom.createTextNode("@");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createComment("");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("button");
        dom.setAttribute(el7,"type","submit");
        dom.setAttribute(el7,"class","btn btn-primary");
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2, 0, 0, 0, 0]);
        var element1 = dom.childAt(element0, [2]);
        var element2 = dom.childAt(element1, [1]);
        var morphs = new Array(7);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]),0,0);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [0]),0,0);
        morphs[2] = dom.createMorphAt(dom.childAt(element0, [1]),0,0);
        morphs[3] = dom.createElementMorph(element1);
        morphs[4] = dom.createMorphAt(dom.childAt(element1, [0, 0]),1,1);
        morphs[5] = dom.createAttrMorph(element2, 'disabled');
        morphs[6] = dom.createMorphAt(element2,0,0);
        return morphs;
      },
      statements: [
        ["block","photo-layout",[],["photos",["subexpr","@mut",[["get","selection.collection.photos",["loc",[null,[1,57],[1,84]]]]],[],[]],"zoom","0.25","width",["subexpr","@mut",[["get","width",["loc",[null,[1,103],[1,108]]]]],[],[]],"height",["subexpr","@mut",[["get","height",["loc",[null,[1,116],[1,122]]]]],[],[]],"margin","5"],0,null,["loc",[null,[1,34],[1,305]]]],
        ["content","selection.collection.name",["loc",[null,[1,519],[1,548]]]],
        ["block","each",[["get","s",["loc",[null,[1,565],[1,566]]]],["get","in",["loc",[null,[1,567],[1,569]]]],["get","selection.collection.selections",["loc",[null,[1,570],[1,601]]]]],[],1,null,["loc",[null,[1,557],[1,631]]]],
        ["element","action",["save",["get","selection",["loc",[null,[1,658],[1,667]]]]],["on","submit"],["loc",[null,[1,642],[1,681]]]],
        ["inline","input",[],["id","selection-new-email","value",["subexpr","@mut",[["get","selection.email",["loc",[null,[1,813],[1,828]]]]],[],[]],"type","email","required","required","placeholder",["subexpr","t",["placeholders.email"],[],["loc",[null,[1,874],[1,898]]]],"class","form-control"],["loc",[null,[1,774],[1,921]]]],
        ["attribute","disabled",["get","loading",["loc",[null,[1,971],[1,978]]]]],
        ["inline","t",["selection.new.submit"],[],["loc",[null,[1,1005],[1,1033]]]]
      ],
      locals: [],
      templates: [child0, child1]
    };
  }()));

});
define('epica/templates/error', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "topLevel": false,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 30
          }
        },
        "moduleName": "epica/templates/error.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Error");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
        return morphs;
      },
      statements: [
        ["content","model",["loc",[null,[1,17],[1,26]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('epica/templates/loading', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 220
          }
        },
        "moduleName": "epica/templates/loading.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","container");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row");
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","col-md-4 col-md-offset-4");
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","card card-margin-top card-white");
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","card-block");
        var el6 = dom.createElement("h2");
        dom.setAttribute(el6,"class","card-title");
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 0, 0, 0, 0, 0]),0,0);
        return morphs;
      },
      statements: [
        ["inline","t",["loading"],[],["loc",[null,[1,170],[1,185]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('epica/templates/selection/index', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 58
          }
        },
        "moduleName": "epica/templates/selection/index.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["inline","selection-edit",[],["selection",["subexpr","@mut",[["get","model",["loc",[null,[1,27],[1,32]]]]],[],[]],"view_photo","view_photo"],["loc",[null,[1,0],[1,58]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('epica/templates/selection/photo', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 60
          }
        },
        "moduleName": "epica/templates/selection/photo.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["inline","photo-show",[],["photo",["subexpr","@mut",[["get","model",["loc",[null,[1,19],[1,24]]]]],[],[]],"selection",["subexpr","@mut",[["get","selection",["loc",[null,[1,35],[1,44]]]]],[],[]],"close","close"],["loc",[null,[1,0],[1,60]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('epica/tests/app.jshint', function () {

  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('app.js should pass jshint', function(assert) { 
    assert.ok(true, 'app.js should pass jshint.'); 
  });

});
define('epica/tests/helpers/ember-i18n/test-helpers', ['ember'], function (Ember) {

  'use strict';

  Ember['default'].Test.registerHelper('t', function (app, key, interpolations) {
    var i18n = app.__container__.lookup('service:i18n');
    return i18n.t(key, interpolations);
  });

  // example usage: expectTranslation('.header', 'welcome_message');
  Ember['default'].Test.registerHelper('expectTranslation', function (app, element, key, interpolations) {
    var text = app.testHelpers.t(key, interpolations);

    assertTranslation(element, key, text);
  });

  var assertTranslation = (function () {
    if (typeof QUnit !== 'undefined' && typeof ok === 'function') {
      return function (element, key, text) {
        ok(find(element + ':contains(' + text + ')').length, 'Found translation key ' + key + ' in ' + element);
      };
    } else if (typeof expect === 'function') {
      return function (element, key, text) {
        var found = !!find(element + ':contains(' + text + ')').length;
        expect(found).to.equal(true);
      };
    } else {
      return function () {
        throw new Error("ember-i18n could not find a compatible test framework");
      };
    }
  })();

});
define('epica/tests/helpers/resolver', ['exports', 'ember/resolver', 'epica/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('epica/tests/helpers/resolver.jshint', function () {

  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/resolver.js should pass jshint', function(assert) { 
    assert.ok(true, 'helpers/resolver.js should pass jshint.'); 
  });

});
define('epica/tests/helpers/start-app', ['exports', 'ember', 'epica/app', 'epica/config/environment'], function (exports, Ember, Application, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
define('epica/tests/helpers/start-app.jshint', function () {

  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/start-app.js should pass jshint', function(assert) { 
    assert.ok(true, 'helpers/start-app.js should pass jshint.'); 
  });

});
define('epica/tests/integration/components/scroll-stick-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('scroll-stick', 'Integration | Component | scroll stick', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);
    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'topLevel': null,
          'revision': 'Ember@2.1.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 16
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'scroll-stick', ['loc', [null, [1, 0], [1, 16]]]]],
        locals: [],
        templates: []
      };
    })()));
    assert.equal(this.$().text().trim(), '');
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'topLevel': null,
            'revision': 'Ember@2.1.0',
            'loc': {
              'source': null,
              'start': {
                'line': 1,
                'column': 0
              },
              'end': {
                'line': 3,
                'column': 0
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('  template block text\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'topLevel': null,
          'revision': 'Ember@2.1.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 3,
              'column': 17
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['block', 'scroll-stick', [], [], 0, null, ['loc', [null, [1, 0], [3, 17]]]]],
        locals: [],
        templates: [child0]
      };
    })()));
    return assert.equal(this.$().text().trim(), 'template block text');
  });

});
define('epica/tests/locales/fr/config.jshint', function () {

  'use strict';

  QUnit.module('JSHint - locales/fr');
  QUnit.test('locales/fr/config.js should pass jshint', function(assert) { 
    assert.ok(true, 'locales/fr/config.js should pass jshint.'); 
  });

});
define('epica/tests/locales/fr/translations.jshint', function () {

  'use strict';

  QUnit.module('JSHint - locales/fr');
  QUnit.test('locales/fr/translations.js should pass jshint', function(assert) { 
    assert.ok(true, 'locales/fr/translations.js should pass jshint.'); 
  });

});
define('epica/tests/models/collection.jshint', function () {

  'use strict';

  QUnit.module('JSHint - models');
  QUnit.test('models/collection.js should pass jshint', function(assert) { 
    assert.ok(true, 'models/collection.js should pass jshint.'); 
  });

});
define('epica/tests/routes/collection/new-selection.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes/collection');
  QUnit.test('routes/collection/new-selection.js should pass jshint', function(assert) { 
    assert.ok(true, 'routes/collection/new-selection.js should pass jshint.'); 
  });

});
define('epica/tests/routes/collection.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/collection.js should pass jshint', function(assert) { 
    assert.ok(true, 'routes/collection.js should pass jshint.'); 
  });

});
define('epica/tests/serializers/application.jshint', function () {

  'use strict';

  QUnit.module('JSHint - serializers');
  QUnit.test('serializers/application.js should pass jshint', function(assert) { 
    assert.ok(true, 'serializers/application.js should pass jshint.'); 
  });

});
define('epica/tests/services/store.jshint', function () {

  'use strict';

  QUnit.module('JSHint - services');
  QUnit.test('services/store.js should pass jshint', function(assert) { 
    assert.ok(true, 'services/store.js should pass jshint.'); 
  });

});
define('epica/tests/test-helper', ['epica/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
define('epica/tests/test-helper.jshint', function () {

  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('test-helper.js should pass jshint', function(assert) { 
    assert.ok(true, 'test-helper.js should pass jshint.'); 
  });

});
define('epica/utils/i18n/compile-template', ['exports', 'ember-i18n/utils/i18n/compile-template'], function (exports, compile_template) {

	'use strict';



	exports['default'] = compile_template['default'];

});
define('epica/utils/i18n/missing-message', ['exports', 'ember-i18n/utils/i18n/missing-message'], function (exports, missing_message) {

	'use strict';



	exports['default'] = missing_message['default'];

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('epica/config/environment', ['ember'], function(Ember) {
  var prefix = 'epica';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("epica/tests/test-helper");
} else {
  require("epica/app")["default"].create({"name":"epica","version":"0.0.0+c40c82c6"});
}

/* jshint ignore:end */
//# sourceMappingURL=epica.map