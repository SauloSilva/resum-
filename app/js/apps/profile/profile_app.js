this.Resume.module('ProfileApp', function(ProfileApp, App, Backbone, Marionette, $, _) {
  var API;

  ProfileApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      '': 'show',
      ':region/': 'show'
    }
  });

  API = {
    pathToRegion: function(region) {
      return region ? '/' + region + '/' : '/';
    },

    show: function(region) {
      new ProfileApp.Show.Controller(this.pathToRegion(region));
      App.vent.trigger('path:visited', this.pathToRegion(region));
    }
  };

  ProfileApp.on('start', function() {
    new ProfileApp.Router({controller: API});
  });

  App.vent.on('home:visit', function() {
    App.vent.trigger('visit', '/');
    API.show();
  });
});
