(function () {
    'use strict'
    var resume = {
        templateUrl: '../templates/resume.html',
        controller: ['MetaService', function (MetaService) {
            var self = this;

            MetaService.setTitle("Resume");
            MetaService.setDescription("Peter McNeely's Resume");
        }]
    };

    angular
        .module('site')
        .component('resume', resume);
})();