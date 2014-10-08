define(function (require) {

    "use strict";

    var $               = require('jquery'),
        Backbone        = require('backbone'),
        localStorage    = require('backbone.localStorage'),
        videoLocalStorage = new Backbone.LocalStorage("videos"),
        
        Video = Backbone.Model.extend({
            localStorage: videoLocalStorage
        }),
        
        VideoCollection = Backbone.Collection.extend({
            model: Video,
            localStorage: videoLocalStorage
        });
    
    return {
        Video: Video,
        VideoCollection: VideoCollection
    };
});