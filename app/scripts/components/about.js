(function () {
    'use strict'
    var about = {
        templateUrl: '../templates/about.html',
        controller: ['MetaService', function (MetaService) {
            var self = this;

            MetaService.setTitle("About");
            MetaService.setDescription("About Peter McNeely");

            self.favorite = {
                language: "C#",
                framework: "Angular",
                tool: "Entity",
                placeToRun: "Prospect Park"
            };

            self.job = {
                site: "https://www.miacanalytics.com",
                name: "MIAC Analytics"
            };
        }]
    };

    angular
        .module('site')
        .component('about', about);
})();