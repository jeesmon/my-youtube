define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Handlebars  = require('handlebars'),
        Backbone    = require('backbone'),
        Mediator    = require('backbone-mediator'),
        longpress   = require('longpress'),
        models      = require('app/models/profile'),
        tplText     = require('text!tpl/ProfileList.html'),
        template = Handlebars.compile(tplText);


    return Backbone.View.extend({

        initialize: function () {
            this.render();
            this.collection.on("reset", this.render, this);
        },
        
        events: {
            "longpress .profile-item": "profileLongPress"
        },
        
        profileLongPress: function(event) {
            var profile = new models.Profile({id: $(event.currentTarget)[0].id});
            profile.fetch({
                success: function (profile) {
                    console.log(JSON.stringify(profile));
                    if(confirm('Delete ' + profile.get("name") + '?')) {
                        profile.destroy();
                        Backbone.Mediator.pub('profile:removed');
                    }
                }
            });
        },
        
        render: function () {
            console.log('render');
            this.$el.html(template(this.collection.toJSON()));
            return this;
        }
    });

});