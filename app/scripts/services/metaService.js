(function () {
    'use strict';

    angular
        .module('site')
        .service('MetaService', MetaService);
    
    function MetaService() {
        var title = "Peter McNeely's Website";
        var description = "Personal Website";

        return {
            description: function () {
                return description;
            },
            title: function () {
                return title;
            },
            setDescription: function (data) {
                description = data;
            },
            setTitle: function (data) {
                title = data;
            },
            reset: function () {
                title = "Peter McNeely's Website";
                description = "Peter McNeely's Website";
            }
        };
    }
})();