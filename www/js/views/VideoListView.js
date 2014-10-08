define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Handlebars  = require('handlebars'),
        Backbone    = require('backbone'),
        Mediator    = require('backbone-mediator'),
        longpress   = require('longpress'),
        models      = require('app/models/video'),
        tplText     = require('text!tpl/VideoList.html'),
        template = Handlebars.compile(tplText);


    return Backbone.View.extend({

        initialize: function () {
            this.render();
            this.collection.on("reset", this.render, this);
        },
        
        events: {
            "longpress .video-item": "videoLongPress"
        },
        
        videoLongPress: function(event) {
            var video = new models.Video({id: $(event.currentTarget)[0].id});
            video.fetch({
                success: function (video) {
                    console.log(JSON.stringify(video));
                    if(confirm('Delete ' + video.get("title") + '?')) {
                        video.destroy();
                        Backbone.Mediator.pub('video:removed');
                    }
                }
            });
        },
        
        grid: function(data) {
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
            
            return result;
        },

        render: function () {
            this.$el.html(template(this.grid(this.collection.toJSON())));
            return this;
        }
    });

});