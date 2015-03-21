this.Resume.module('MetasApp', function(MetasApp, App, Backbone, Marionette, $, _) {
  var API;

  API = {
    chageMeta: function(type) {
      new MetasApp.Handler.Controller(type);
    },
  };

  App.vent.on('path:visited', function(type) {
    API.chageMeta(type);
  });
});
