define(function (require) {

    "use strict";

    var $               = require('jquery'),
        Handlebars      = require('handlebars'),
        Backbone        = require('backbone'),
        Mediator        = require('backbone-mediator'),
        ProfileListView = require('app/views/ProfileListView'),
        models          = require('app/models/profile'),
        tplText         = require('text!tpl/Home.html'),
        template = Handlebars.compile(tplText);


    return Backbone.View.extend({

        initialize: function () {
            this.profileList = new models.ProfileCollection();
            this.search();
            this.render();
        },
        
        subscriptions: {
            'profile:added': 'refresh',
            'profile:removed': 'refresh'
        },
        
        refresh: function () {
            this.search();
            this.render();
        },
        
        search: function() {
            console.log("search");
            this.profileList.fetch({
                success: _.bind(function() {
                    //alert(JSON.stringify(this.profileList));   
                }, this)
            });  
        },
        
        render: function () {
            console.log('HomeView: render');
            this.$el.html(template());
            
            this.listView = new ProfileListView({collection: this.profileList, el: $(".scroller", this.$el)});
            
            return this;
        }
    });

});