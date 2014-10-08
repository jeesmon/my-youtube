define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Handlebars  = require('handlebars'),
        Backbone    = require('backbone'),
        VideoListView = require('app/views/VideoListView'),
        models          = require('app/models/video'),
        tplText     = require('text!tpl/Video.html'),
        template = Handlebars.compile(tplText);

    return Backbone.View.extend({

        initialize: function () {
            this.render();
        },
        
        subscriptions: {
            'video:removed': 'refresh'
        },
        
        refresh: function () {
            this.render();
        },

        render: function () {
            console.log(JSON.stringify(this.model));
            
            window.sessionStorage.setItem("current_profile", this.model.id);

            this.$el.html(template(this.model.toJSON()));
            
            this.videoList = new models.VideoCollection();
            this.videoList.fetch();
            
            this.filteredVideoList = new Backbone.Collection(this.videoList.where({profile: this.model.id}));
            
            console.log(JSON.stringify(this.filteredVideoList.toJSON()));
            
            this.listView = new VideoListView({collection: this.filteredVideoList, el: $(".scroller", this.el)});
            
            return this;
        }
    });

});