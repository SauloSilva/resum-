this.Resume.module('MetasApp.Handler', function(Handler, App, Backbone, Marionette, $, _) {
  Handler.TitleView = Marionette.ItemView.extend({
    template: false,
    el: 'title',
    initialize: function() {
      this.$el.text(this.model.get('title') + 'Saulo da Silva Santiago');
    }
  });

  Handler.DescriptionView = Marionette.ItemView.extend({
    template: false,
    el: "meta[name='description']",
    initialize: function() {
      this.$el.attr('content', this.model.get('description'));
    }
  });
});
