define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),

        findById = function (id) {
            var deferred = $.Deferred(),
                profile = null,
                l = profiles.length;
            for (var i = 0; i < l; i++) {
                if (profiles[i].id === id) {
                    profile = profiles[i];
                    break;
                }
            }
            deferred.resolve(profile);
            return deferred.promise();
        },

        findAll = function () {
            var deferred = $.Deferred();
            deferred.resolve(profiles);
            return deferred.promise();
        },

        profiles = [
            {   "id": 1,
                "name": "Kid 1",
            },
            {   "id": 2,
                "name": "Kid 2",
            }
        ],

        Profile = Backbone.Model.extend({

            sync: function (method, model, options) {
                if (method === "read") {
                    findById(parseInt(this.id)).done(function (data) {
                        options.success(data);
                    });
                }
            }

        }),

        ProfileCollection = Backbone.Collection.extend({

            model: Profile,

            sync: function (method, model, options) {
                if (method === "read") {
                    findAll().done(function (data) {
                        options.success(data);
                    });
                }
            }

        });

    return {
        Profile: Profile,
        ProfileCollection: ProfileCollection
    };

});