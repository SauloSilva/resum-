this.Resume.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
  var API;
  var resume = void 0;

  Entities.Resume = Backbone.Model.extend({
    urlRoot: '/resume/',
    initialize: function() {
      this.fetch();
    }
  });

  Entities.Home = Backbone.Model.extend({
    initialize: function(resume) {
      this.set(resume.get('home'));
    }
  });

  Entities.Informations = Backbone.Collection.extend({
    addModels: function(resume) {
      this.add(resume.get('informations'));
    }
  });

  Entities.SkillGroups = Backbone.Collection.extend({
    addModels: function(resume) {
      var skillGroups = resume.get('skills');
      var collections = _.values(skillGroups);
      var titles = _.keys(skillGroups);

      var groupsModel = _.map(titles, function(title, i) {
        var model = new Backbone.Model({ title: title });

        model.set({
          collections: new Backbone.Collection(collections[i])
        });

        return model;
      });

      this.add(groupsModel);
    }
  });

  Entities.ExperienceGroups = Backbone.Collection.extend({
    addModels: function(resume) {
      var experiences = resume.get('expiriences');

      models = _.map(experiences, function(experience) {
        return new Backbone.Model({
          company: experience.company,
          role: experience.role,
          period: experience.period,
          jobDescription: experience.jobDescription,
          jobs: new Backbone.Collection(experience.jobs)
        });
      });

      this.add(models);
    }
  });

  Entities.FreeTime = Backbone.Collection.extend({
    addModels: function(resume) {
      this.add(resume.get('freeTime'));
    }
  });

  Entities.Courses = Backbone.Collection.extend({
    addModels: function(resume) {
      this.add(resume.get('courses'));
    }
  });

  Entities.Socials = Backbone.Collection.extend({
    addModels: function(resume) {
      this.add(resume.get('socials'));
    }
  });

  Entities.Meta = Backbone.Model.extend({
    parse: function(options) {
      return options.resume.get('metas')[options.type];
    }
  });

  API = {

    getResume: function() {
      if (resume == null) {
        resume = new Entities.Resume();
      }

      return resume;
    },

    getHome: function(resume) {
      return new Entities.Home(resume);
    },

    getInformations: function(resume) {
      var collection = new Entities.Informations();
      collection.addModels(resume);
      return collection;
    },

    getSkillsGroups: function(resume) {
      var collection = new Entities.SkillGroups();
      collection.addModels(resume);
      return collection;
    },

    getExperiencesGroups: function(resume) {
      var collection = new Entities.ExperienceGroups();
      collection.addModels(resume);
      return collection;
    },

    getFreeTime: function (resume) {
      var collection = new Entities.FreeTime();
      collection.addModels(resume);
      return collection;
    },

    getCourses: function (resume) {
      var collection = new Entities.Courses();
      collection.addModels(resume);
      return collection;
    },

    getSocials: function (resume) {
      var collection = new Entities.Socials();
      collection.addModels(resume);
      return collection;
    },

    getMetas: function (resume, type) {
      return new Entities.Meta({ resume: resume, type: type }, { parse: true });
    }
  };

  App.reqres.setHandler('resume:entity', function() {
    return API.getResume();
  });

  App.reqres.setHandler('home:entity', function(resume) {
    return API.getHome(resume);
  });

  App.reqres.setHandler('informations:entities', function(resume) {
    return API.getInformations(resume);
  });

  App.reqres.setHandler('skills:groups:entities', function(resume) {
    return API.getSkillsGroups(resume);
  });

  App.reqres.setHandler('experiences:groups:entities', function(resume) {
    return API.getExperiencesGroups(resume);
  });

  App.reqres.setHandler('free:time:entities', function(resume) {
    return API.getFreeTime(resume);
  });

  App.reqres.setHandler('courses:entities', function(resume) {
    return API.getCourses(resume);
  });

  App.reqres.setHandler('socials:entities', function(resume) {
    return API.getSocials(resume);
  });

  App.reqres.setHandler('metas:entities', function(resume, type) {
    return API.getMetas(resume, type);
  });
});
