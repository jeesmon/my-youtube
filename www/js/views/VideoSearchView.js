define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Handlebars  = require('handlebars'),
        Backbone    = require('backbone'),
        VideoSearchListView = require('app/views/VideoSearchListView'),
        models          = require('app/models/youtube'),
        tplText     = require('text!tpl/VideoSearch.html'),
        template = Handlebars.compile(tplText);

    return Backbone.View.extend({

        initialize: function () {
            this.youTubeList = new models.YouTubeCollection();
            this.render();
        },

        render: function () {
            console.log('render');
            this.$el.html(template());
            $('.search-key', this.$el).val(window.localStorage.getItem("search_key"));
            this.youTubeList.fetch(
                {
                    reset: true, 
                    data: {},
                    success: _.bind(function() {
                        console.log('length: ' + this.youTubeList.toJSON().length);
                      this.listView = new VideoSearchListView({collection: this.youTubeList, el: $(".scroller", this.el)});
                    }, this)
                }
            );
            return this;
        },
        
        events: {
            "keypress .search-key": "onkeypress"
        },

        search: function (event) {
            console.log("search");
            var key = $('.search-key').val();
            window.localStorage.setItem("search_key", key);
            this.youTubeList.fetch(
                {
                    reset: true, 
                    data: {name: key},
                    success: _.bind(function() {
                        console.log('length: ' + this.youTubeList.toJSON().length);
                      this.listView = new VideoSearchListView({collection: this.youTubeList, el: $(".scroller", this.el)});
                    }, this)
                }
            );
        },

        onkeypress: function (event) {
            if (event.keyCode === 13) { // enter key pressed
                this.search(event);
            }
        }
    });

});