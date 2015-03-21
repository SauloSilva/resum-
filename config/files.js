module.exports = function(lineman) {
  return {
    js: {
      vendor: [
        "vendor/js/jquery/dist/jquery.js",
        "vendor/js/underscore/underscore.js",
        "vendor/js/backbone/backbone.js",
        "vendor/js/backbone.babysitter/lib/backbone.babysitter.js",
        "vendor/js/backbone.wreqres/lib/backbone.wreqres.js",
        "vendor/js/backbone.wreqres/lib/backbone.wreqres.js",
        "vendor/js/marionette/lib/backbone.marionette.js",
        "vendor/js/boostrap/dist/js/boostrap.js",
        "vendor/js/spinjs/spin.js"
      ]
    },
  };

  return {
    sass: {
      main: 'app/css/*.{scss,sass}'
    }
  };
};
