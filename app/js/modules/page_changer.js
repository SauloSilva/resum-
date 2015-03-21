this.Resume.module('PageChanger', function(PageChanger, App, Backbone, Marionette, $, _) {
  var timeout = void 0;

  PageChanger.Changer = {
    navigate: function(path, options) {
      var route = this.urlFor(path);
      var _this = this;

      if (_this.currentPath() != route) {
        if (!_.isNull(timeout)) {
          clearTimeout(timeout);
        }

        timeout = setTimeout(function() {
          App.vent.trigger('path:visited', path)
          Backbone.history.navigate(path, options);
          _this.trackPageView();
        }, 500);
      }
    },

    currentPath: function() {
      return this.urlFor(Backbone.history.fragment);
    },

    trackPageView: function() {
      path = Backbone.history.fragment;

      if (this.isSearchEngine()) {
        path =+ '?search_engine=true';
      }

      ga('send', 'pageview', path);
    },

    isSearchEngine: function() {
      location.search.match(/search_engine/);
    },

    urlFor: function(route) {
      if(!route) {
        route = '/';
      }

      if (route.slice(0) !== '/') {
        route = '/' + route;
      }

      if (route.slice(-1) !== '/') {
        route = route + '/';
      }

      return route.replace(/\/\//g, '/');
    }
  },

  API = {
    visit: function(path) {
      PageChanger.Changer.navigate(path);
    }
  },

  App.vent.on('visit page:rolled', function(path) {
    API.visit(path);
  });
});