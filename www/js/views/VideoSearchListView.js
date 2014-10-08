define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Handlebars  = require('handlebars'),
        Backbone    = require('backbone'),
        Mediator        = require('backbone-mediator'),
        tplText     = require('text!tpl/VideoSearchList.html'),
        template = Handlebars.compile(tplText);


    return Backbone.View.extend({

        initialize: function () {
            this.render();
            this.collection.on("reset", this.render, this);
        },
        
        events: {
            "click .play-video": "playVideo"
        },
        
        playVideo: function(event) {
            var vid = $(event.currentTarget)[0].id;
            console.log('play video: ' + vid);
            var coll = this.collection.toJSON();
            var len = coll.length;
            for(var i=0; i<len; i++) {
                if(coll[i].vid == vid) {
                    console.log(JSON.stringify(coll[i]));
                    
                    window.sessionStorage.setItem("current_video", JSON.stringify(coll[i]));
                    
                    appRouter.navigate('#search/play/' + vid, {
                        trigger: true,
                        success: function() {
                            console.log('navigated');   
                        }
                    });
                    Backbone.Mediator.pub('video:play');
                    
                    return false;
                }
            }
            return false;
        },
        
        render: function () {
            this.$el.html(template(this.collection.toJSON()));
            return this;
        }
    });

});