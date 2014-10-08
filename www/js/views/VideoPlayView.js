define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Handlebars  = require('handlebars'),
        Backbone    = require('backbone'),
        Mediator        = require('backbone-mediator'),
        models          = require('app/models/video'),
        tplText     = require('text!tpl/VideoPlay.html'),
        template = Handlebars.compile(tplText);

    return Backbone.View.extend({

        initialize: function () {
            Backbone.Mediator.sub('video:play', this.videoPlay, this);
            this.render();
        },
        
        subscriptions: {
            'video:play': 'videoPlay'
        },
        
        events: {
            "click .bookmark-button": "bookmark"
        },
        
        videoPlay: function() {
            console.log('videoPlay');
            //this.video = video;
        },
        
        bookmark: function(event) {
            var obj = JSON.parse(window.sessionStorage.getItem("current_video"));
            var profile = window.sessionStorage.getItem("current_profile");
            var video = new models.Video({
                profile: profile,
                title: obj.title,
                thumbnail: obj.thumbnail,
                duration: obj.duration,
                url: obj.url,
                vid: obj.vid
            });
            video.save();
            console.log('bookmark' + JSON.stringify(video));
            appRouter.navigate("#videos/" + profile, {trigger: true});
        },
        
        render: function () {
            this.$el.html(template(this.model.toJSON()));
            return this;
        }
    });

});