this.Resume.module('ProfileApp.Show', function(Show, App, Backbone, Marionette, $, _) {
  Show.Layout = Marionette.LayoutView.extend({
    template: 'layout.us',

    regions: {
      loadRegion: '.load_region',
      homeRegion: '.home_region',
      informationRegion: '.information_region',
      skillsRegion: '.skill_region',
      experiencesRegion: '.expiriences_region',
      freeTimeRegion: '.free_time_region',
      coursesRegion: '.courses_region',
      footerRegion: '.footer_region'
    },

    className: 'container-fluid',

    behaviors: {
      "ScrollWatcher": { }
    }
  });

  Show.LoadView = Marionette.ItemView.extend({
    tagName: 'div',
    className: 'load',
    template: false,
    initialize: function() {
      var spinner = new Spinner().spin();
      this.$el.append(spinner.el);
    }
  });

  Show.HomeView = Marionette.ItemView.extend({
    template: 'home.us',
    className: 'jumbotron'
  });

  Show.StrengthView = Marionette.ItemView.extend({
    template: 'strength.us',
    tagName: 'li'
  });

  Show.InformationView = Marionette.CompositeView.extend({
    template: 'information.us',
    childViewContainer: '.information_region',
    childView: Show.StrengthView,
    className: 'row-fluid margin-top-40'
  });

  Show.SkillView = Marionette.ItemView.extend({
    template: 'skill.us',
    tagName: 'li'
  });

  Show.SkillsView = Marionette.CompositeView.extend({
    template: 'skills.us',
    className: 'skill_group',
    childViewContainer: 'ul.skills_region',
    childView: Show.SkillView,
    initialize: function() {
      this.collection = this.model.get('collections');
    }
  });

  Show.SkillsGroupsView = Marionette.CompositeView.extend({
    template: 'skills_layout.us',
    childViewContainer: '.groups_region',
    childView: Show.SkillsView,
    className: 'row-fluid margin-top-40'
  });

  Show.ExperienceView = Marionette.ItemView.extend({
    template: 'experience.us'
  });

  Show.ExperiencesView = Marionette.CompositeView.extend({
    template: 'experiences.us',
    className: 'experience_group',
    childViewContainer: '.experiences_region',
    childView: Show.ExperienceView,
    initialize: function() {
      this.collection = this.model.get('jobs');
    }
  });

  Show.ExperiencesGroupsView = Marionette.CompositeView.extend({
    template: 'experiences_layout.us',
    childViewContainer: '.groups_region',
    childView: Show.ExperiencesView,
    className: 'row-fluid margin-top-40'
  });

  Show.ActivityView = Marionette.ItemView.extend({
    template: 'activity.us',
    tagName: 'li'
  });

  Show.FreeTimeView = Marionette.CompositeView.extend({
    template: 'free_time.us',
    childViewContainer: 'ul.activities_region',
    childView: Show.ActivityView,
    className: 'row-fluid margin-top-40'
  });

  Show.CourseView = Marionette.ItemView.extend({
    template: 'course.us',
    tagName: 'li'
  });

  Show.CoursesView = Marionette.CompositeView.extend({
    template: 'courses.us',
    childViewContainer: 'ul.courses_region',
    childView: Show.CourseView,
    className: 'row-fluid margin-top-40'
  });

  Show.SocialView = Marionette.ItemView.extend({
    template: 'social.us',
    tagName: 'a',
    className: function() {
      return this.model.get('name');
    },
    attributes: function() {
      return {
        href: this.model.get('href'),
        target: '_blank'
      };
    }
  });

  Show.FooterView = Marionette.CompositeView.extend({
    template: 'footer.us',
    tagName: 'footer',
    childViewContainer: '.socials_region',
    childView: Show.SocialView,
    className: 'alert alert-info margin-top-40'
  });
});
