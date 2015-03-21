(function(Marionette) {
  return _.extend(Marionette.Renderer, {
    lookups: ['app/templates'],

    render: function(template, data) {
      var path;
      if (!template) { return; }

      path = this.getTemplate(template);

      if (!path) {
        throw "Template " + template + " not found!";
      }

      return path(data);
    },

    getTemplate: function(template) {
      var lookup, path, _i, _len, _ref;
      _ref = this.lookups;

      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        lookup = _ref[_i];
        path = "" + lookup + "/" + template;

        if (JST[path]) {
          return JST[path];
        }
      }
    }
  });
})(Marionette);
