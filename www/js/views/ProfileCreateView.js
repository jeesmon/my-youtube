define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Handlebars  = require('handlebars'),
        Backbone    = require('backbone'),
        Mediator    = require('backbone-mediator'),
        models      = require('app/models/profile'),
        tplText     = require('text!tpl/ProfileCreate.html'),
        template = Handlebars.compile(tplText);


    return Backbone.View.extend({

        initialize: function () {
            this.render();
        },
        
        events: {
            "click .profile-save": "submit"
        },

        render: function () {
            this.$el.html(template());            
            return this;
        },
        
        submit: function(event) {
            var profile = new models.Profile();
            profile.save(
                {
                    name: $('#profileName').val()
                },
                
                {
                    wait: true,
                    success: function(profile) {
                        appRouter.navigate('#profile/list', {trigger: true});
                        Backbone.Mediator.pub('profile:added');
                    }
                }
            );
            
            return false;
        }
    });

});