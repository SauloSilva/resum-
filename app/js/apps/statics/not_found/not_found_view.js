this.Resume.module('StaticsApp.NotFound', function(NotFound, App, Backbone, Marionette, $, _) {
  NotFound.View = Marionette.ItemView.extend({
    template: 'not_found.us',
    className: 'not_found',
    triggers: {
      'click a.back': 'back:clicked'
    }
  });
});
