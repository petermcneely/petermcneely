(function () {
    var about = {
        templateUrl: '../templates/about.html',
        controller: function () {
        }
    };

    angular
        .module('site')
        .component('about', about);
})();