this.Resume = (function(Backbone, Marionette) {
  var App;

  App = new Marionette.Application();

  App.addRegions({
    profileRegion: '[data-region=profile]'
  });

  App.addInitializer(function() {
    App.module('ProfileApp').start();
    App.module('StaticsApp').start();
  });

  App.on('start', function() {
    Backbone.history.start({
      pushState: true
    });
  });

  return App;
})(Backbone, Marionette);

$(document).ready(function() {
  var stylesheet = loadCSS(location.protocol + '//' + location.host + '/css/app.css');

  onloadCSS( stylesheet, function() {
    Resume.start();
  });
});