this.Resume.module('StaticsApp.NotFound', function(NotFound, App, Backbone, Marionette, $, _) {
  NotFound.Controller = Marionette.Controller.extend({
    initialize: function() {
      this.notFoundRegion();
    },

    notFoundRegion: function() {
      view = this.getNotFoundView();

      this.listenTo(view, 'back:clicked', function() {
        App.vent.trigger('home:visit');
      });

      App.profileRegion.show(view);
    },

    getNotFoundView: function() {
      return new NotFound.View();
    }
  });
});
