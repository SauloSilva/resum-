this.Resume.module('ProfileApp.Show', function(Show, App, Backbone, Marionette, $, _) {
  Show.Controller = Marionette.Controller.extend({
    initialize: function() {
      this.layout = this.getLayout();
      var _this = this;

      _this.listenTo(_this.layout, 'show', function() {
        _this.loadViewRegion();
        _this.resume = App.request('resume:entity');

        App.execute('when:fetched', _this.resume, function() {
          _this.init();
          App.vent.trigger('scroll:to', _this.options);
        });
      });

      App.profileRegion.show(this.layout);
    },

    init: function() {
      this.homeEntity = App.request('home:entity', this.resume);
      this.informationEntities = App.request('information:entities', this.resume);
      this.skillsGroupsEntities = App.request('skills:groups:entities', this.resume);
      this.experiencesGroupsEntities = App.request('experiences:groups:entities', this.resume);
      this.freeTimeEntities = App.request('free:time:entities', this.resume);
      this.coursesEntities = App.request('courses:entities', this.resume);
      this.socialsEntities = App.request('socials:entities', this.resume);

      this.removeLoad();

      this.homeRegion();
      this.informationsRegion();
      this.skillsRegion();
      this.experiencesRegion();
      this.freeTimeRegion();
      this.coursesRegion();
      this.footerRegion();
    },

    getLayout: function() {
      return new Show.Layout();
    },

    loadViewRegion: function() {
      var loadView = this.getLoadView();
      this.layout.loadRegion.show(loadView);
    },

    getLoadView: function() {
      return new Show.LoadView();
    },

    removeLoad: function() {
      var loadView = this.layout.loadRegion.currentView;
      if (loadView) {
        loadView.destroy();
      }
    },

    homeRegion: function () {
      homeView = this.getHomeView();
      this.layout.homeRegion.show(homeView);
    },

    getHomeView: function() {
      return new Show.HomeView({
        model: this.homeEntity
      });
    },

    informationsRegion: function () {
      informationView = this.getInformationView();
      this.layout.informationRegion.show(informationView);
    },

    getInformationView: function() {
      return new Show.InformationView({
        collection: this.informationEntities
      });
    },

    skillsRegion: function () {
      skillsLayoutView = this.getSkillsGroupsView();
      this.layout.skillsRegion.show(skillsLayoutView);
    },

    getSkillsGroupsView: function() {
      return new Show.SkillsGroupsView({
        collection: this.skillsGroupsEntities
      });
    },

    experiencesRegion: function () {
      experiencesLayoutView = this.getExperiencesGroupsView();
      this.layout.experiencesRegion.show(experiencesLayoutView);
    },

    getExperiencesGroupsView: function() {
      return new Show.ExperiencesGroupsView({
        collection: this.experiencesGroupsEntities
      });
    },

    freeTimeRegion: function () {
      freeTimeView = this.getFreeTimeView();
      this.layout.freeTimeRegion.show(freeTimeView);
    },

    getFreeTimeView: function() {
      return new Show.FreeTimeView({
        collection: this.freeTimeEntities
      });
    },

    coursesRegion: function () {
      coursesView = this.getCoursesView();
      this.layout.coursesRegion.show(coursesView);
    },

    getCoursesView: function() {
      return new Show.CoursesView({
        collection: this.coursesEntities
      });
    },

    footerRegion: function () {
      footerView = this.getFooterView();
      this.layout.footerRegion.show(footerView);
    },

    getFooterView: function() {
      return new Show.FooterView({
        collection: this.socialsEntities
      });
    }
  });
});
