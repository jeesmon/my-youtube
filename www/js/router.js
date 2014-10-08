define(function (require) {

    "use strict";

    var $ = require('jquery'),
        Backbone = require('backbone'),
        PageSlider = require('app/utils/pageslider'),
        HomeView = require('app/views/HomeView'),

        slider = new PageSlider($('body'));

    return Backbone.Router.extend({

        routes: {
            "": "home",
            "videos/:id": "videos",
            "play/:id": "play",
            "videos/:id/add": "addVideo",
            "profile/add": "addProfile",
            "profile/list": "home",
            "search/play/:id": "searchPlay",
        },

        home: function () {
            console.log('home');
            slider.slidePage(new HomeView().$el);
        },

        videos: function (id) {
            require(["app/models/profile", "app/views/VideoView"], function (models, VideoView) {
                var profile = new models.Profile({id: id});
                profile.fetch({
                    success: function (profile) {
                        console.log(JSON.stringify(profile));
                        slider.slidePage(new VideoView({model: profile}).$el);
                    }
                });
            });
        },
        
        play: function (id) {
            require(["app/models/video", "app/views/VideoPlayView"], function (models, VideoPlayView) {
                var video = new models.Video({id: id});
                video.fetch({
                    success: function (data) {
                        slider.slidePage(new VideoPlayView({model: data}).$el);
                    }
                });
            });
        },
        
        searchPlay: function (id) {
            require(["app/models/youtube", "app/views/VideoPlayView"], function (models, VideoPlayView) {
                var youtube = new models.YouTube({vid: id});
                slider.slidePage(new VideoPlayView({model: youtube}).$el);
            });
        },
        
        addVideo: function (id) {
            require(["app/models/profile", "app/models/video", "app/views/VideoSearchView"], function (profileModel, videoModel, VideoSearchView) {
                slider.slidePage(new VideoSearchView().$el);
            });
        },
        
        addProfile: function () {
            require(["app/models/profile",  "app/views/ProfileCreateView"], function (models, ProfileCreateView) {
                slider.slidePage(new ProfileCreateView().$el);
            }); 
        }
    });

});