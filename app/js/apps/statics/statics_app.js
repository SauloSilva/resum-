this.Resume.module('StaticsApp', function(StaticsApp, App, Backbone, Marionette, $, _) {
  var API;

  StaticsApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      '/404/': 'notFound'
    }
  });

  API = {
    notFound: function() {
      App.vent.trigger('visit', '/404/');
      new StaticsApp.NotFound.Controller();
      App.vent.trigger('404:visited');
    },
  };

  StaticsApp.on('start', function() {
    new StaticsApp.Router({controller: API});
  });

  App.vent.on('not:found', function() {
    API.notFound();
  });
});
