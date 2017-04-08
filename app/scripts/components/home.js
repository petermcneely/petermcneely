(function () {
    var home = {
        templateUrl: '../templates/home.html',
        controller: function () {
            var self = this;
            self.hookedUp = true;
        }
    };

    angular
        .module('site')
        .component('home', home)
        .run(function ($rootScope) {
            $rootScope.$on("$stateChangeError", console.log.bind(console));
        });
})();