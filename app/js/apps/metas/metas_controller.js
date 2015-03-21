this.Resume.module('MetasApp.Handler', function(Handler, App, Backbone, Marionette, $, _) {
  Handler.Controller = Marionette.Controller.extend({
    initialize: function(type) {
      var _this = this;
      var resume = App.request('resume:entity');

      App.execute('when:fetched', resume, function() {
        _this.meta = App.request('metas:entities', resume, type);
        _this.titleRegion();
        _this.descriptionRegion();
      });
    },

    titleRegion: function() {
      this.getTileTag();
    },

    getTileTag: function() {
      return new Handler.TitleView({
        model: this.meta
      });
    },

    descriptionRegion: function() {
      this.getDescriptionTag();
    },

    getDescriptionTag: function() {
      return new Handler.DescriptionView({
        model: this.meta
      });
    }
  });
});
