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

      App.vent.on('scroll:to', function(regionName) {
        if (_.isEmpty(regionName)) { return; }
        regionName = _this.regionNameFormat(regionName);
        var region = _this.view.getRegions()[regionName + 'Region'];

        if (_.isEmpty(region)) {
          App.vent.trigger('not:found');
          _this.window.off('scroll');
        } else {
          var offsetTop = region.$el.offset().top;
          _this.window.scrollTop(offsetTop);
        }
      });
    },

    regionNameFormat: function(regionName) {
      if (regionName.match(/\-/)) {
        names = regionName.split('-');
        return _.first(names) + _.last(names).charAt(0).toUpperCase() + _.last(names).slice(1);
      } else {
        return regionName;
      }
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