define(function (require) {

    "use strict";
    
    var $               = require('jquery'),
        Backbone        = require('backbone'),
        localStorage    = require('backbone.localStorage'),
        profileLocalStorage = new Backbone.LocalStorage("profiles"),
        
        Profile = Backbone.Model.extend({
            localStorage: profileLocalStorage
        }),
    
        ProfileCollection = Backbone.Collection.extend({
            model: Profile,
            localStorage: profileLocalStorage
        });
            
    return {
        Profile: Profile,
        ProfileCollection: ProfileCollection
    };
});