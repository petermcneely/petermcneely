(function () {
    function config($stateProvider, $locationProvider) {
        $locationProvider
            .html5Mode({
                enabled: true,
                requireBase: false
            });

        $stateProvider
            .state('home', {
                url: '/',
                template: '<home></home>'
            });
    };

    angular
        .module('site', ['ui.router'])
        .config(config);
        
})();