define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),

        findById = function (id) {
            var deferred = $.Deferred(),
                video = null,
                l = videos.length;
            for (var i = 0; i < l; i++) {
                if (videos[i].id === id) {
                    video = videos[i];
                    break;
                }
            }
            deferred.resolve(video);
            return deferred.promise();
        },

        findAll = function () {
            var deferred = $.Deferred();
            deferred.resolve(videos);
            return deferred.promise();
        },

        videos = [
            {   "id": 1,
                "name": "Video 1",
                "thumbnail": "https://i.ytimg.com/vi/CevxZvSJLk8/0.jpg",
                "vid": "CevxZvSJLk8"
            },
            {   "id": 2,
                "name": "Video 2",
                "thumbnail": "https://i.ytimg.com/vi/y6Sxv-sUYtM/0.jpg",
                "vid": "y6Sxv-sUYtM"
            },
            {   "id": 3,
                "name": "Video 3",
                "thumbnail": "https://i.ytimg.com/vi/WS4Mev_vRAc/0.jpg",
                "vid": "WS4Mev_vRAc"
            }
        ],

        Video = Backbone.Model.extend({

            sync: function (method, model, options) {
                if (method === "read") {
                    findById(parseInt(this.id)).done(function (data) {
                        options.success(data);
                    });
                }
            }

        }),

        VideoCollection = Backbone.Collection.extend({

            model: Video,

            sync: function (method, model, options) {
                if (method === "read") {
                    findAll().done(function (data) {
                        var result = [], temp = [];
                        
                        data.forEach( function ( elem, i ) {
                            if ( i > 0 && i % 2 === 0 ) {
                                result.push( temp );
                                temp = [];
                            }
                            temp.push( elem );
                        });
                        
                        if ( temp.length > 0 ) {
                            result.push( temp );
                        }
                        
                        options.success(result);
                    });
                }
            }

        });

    return {
        Video: Video,
        VideoCollection: VideoCollection
    };

});