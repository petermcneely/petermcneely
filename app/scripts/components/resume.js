(function () {
    'use strict'
    var resume = {
        templateUrl: '../templates/resume.html',
        controller: function () {
            var self = this;
        }
    };

    angular
        .module('site')
        .component('resume', resume);
})();