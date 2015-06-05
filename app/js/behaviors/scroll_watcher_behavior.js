this.Resume.module('Behaviors', function(Behaviors, App, Backbone, Marionette, $, _) {
  Behaviors.ScrollWatcher = Marionette.Behavior.extend({
    window: $(window),
    document: $(document),
    scrollTop: 0,

    onShow: function() {
      var _this = this;

      _this.window.on('scroll', function() {
        _this.check();
      });

      App.vent.on('scroll:to', function(path) {
        if (_.isEmpty(path) || path === '/') { return; }
        var element = _this.getElementByPath(path);

        if (_.isElement(element[0])) {
          var offsetTop = element.offset().top;
          _this.window.scrollTop(offsetTop);
        } else {
          App.vent.trigger('not:found');
          _this.window.off('scroll');
        }
      });
    },

    getElementByPath: function(path) {
      return this.view.$el.find('div[data-path="'+ path +'"]');
    },

    check: function() {
      var _this = this;

      _.each(_this.view.regions, function(key, value){
        var regionName = value.replace('.', '');
        var element = _this.view.getRegions()[regionName];
        var $element = element.$el;

        if (_this.hasTrigger($element) && _this.hasDataPath($element)) {
          App.vent.trigger('page:rolled', $element.data('path'));
        }
      });
    },

    hasTrigger: function(element) {
      if (!_.isElement(_.first(element))) { return; }
      var _sizeFromTop = element.offset().top - this.window.scrollTop();
      return _sizeFromTop < 0 && element.outerHeight() > (_sizeFromTop * -1);
    },

    hasDataPath: function(element) {
      return !_.isEmpty(element.data('path'));
    }

  });
});