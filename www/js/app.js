require.config({

    baseUrl: 'lib',

    paths: {
        app: '../js',
        tpl: '../tpl'
    },

    map: {
        '*': {
            'app/models/profile': 'app/models/json/profile',
            'app/models/video': 'app/models/json/video',
            'app/models/youtube': 'app/models/json/youtube'
        }
    },
    
    shim: {
        'handlebars': {
            exports: 'Handlebars'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    }
});

require(['jquery', 'backbone', "fastclick", 'app/router', 'handlebars'], function ($, Backbone, FastClick, Router, Handlebars) {

    "use strict";

    window.appRouter = new Router();

    $(function () {
        FastClick.attach(document.body);
    });

    $("body").on("click", ".back-button", function (event) {
        event.preventDefault();
        window.history.back();
    });

    Backbone.history.start();
    
    Handlebars.registerHelper('if_even', function(conditional, options) {
        if((conditional % 2) == 0) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });
});