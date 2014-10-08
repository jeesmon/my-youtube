define(function (require) {

    "use strict";

    var $               = require('jquery'),
        Backbone        = require('backbone'),
        gdataUrl        = "https://gdata.youtube.com/feeds/api/videos?alt=json&version=2&start-index=1&max-results=10&prettyprint=true&fields=title,entry[link/@rel=%27http://gdata.youtube.com/schemas/2007%23mobile%27]&format=5",
        searchKey       = "",
        
        YouTube = Backbone.Model.extend({            
        }),
        
        YouTubeCollection = Backbone.Collection.extend({
            model: YouTube,
            
            url: function() {
                var u = gdataUrl + "&q=" + encodeURIComponent(searchKey);
                console.log(u);
                return u;
            },
            
            parse: function(result) {
                var entries = result.feed.entry;
                var len = entries.length;
                var coll = [];
                for(var i=0; i<len; i++) {
                    var vid = entries[i].id.$t;
                    vid = vid.substr(vid.lastIndexOf("/") + 1);
                    var title = entries[i].title.$t;
                    if(title.length > 20) {
                        title = title.substring(0, 20) + " ...";   
                    }
                    coll.push(new YouTube({
                        title: title,
                        thumbnail: entries[i].media$group.media$thumbnail[0].url,
                        duration: entries[i].media$group.yt$duration.seconds,
                        url: entries[i].link[0].href,
                        vid: vid
                    }));
                }
                
                window.localStorage.setItem("search", JSON.stringify(result));
                
                return coll;
            },
            
            sync: function (method, model, options) {
                if (method === "read") {
                    console.log('read: ' + options.data.name);
                    
                    if(options.data.name) {
                        searchKey = options.data.name;
                        return Backbone.sync(method, model, options);                         
                    }
                    else {
                        console.log('no search key');
                        var search_result = window.localStorage.getItem("search");
                        if(search_result) {
                            options.success(JSON.parse(search_result));
                        }
                    }
                }
            }
        });
    
    return {
        YouTube: YouTube,
        YouTubeCollection: YouTubeCollection
    };
});