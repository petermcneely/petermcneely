(function () {
    function config($stateProvider, $locationProvider) {
        $locationProvider
            .html5Mode({
                enabled: true,
                requireBase: false
            });

        $stateProvider
            .state('blog', {
                url: '/',
                template: '<home></home>'
            })
            .state('about', {
                url: '/about',
                template: '<about></about>'
            })
            .state('resume', {
                url: '/resume',
                template: '<resume></resume>'
            });
    };

    angular
        .module('site', ['ui.router'])
        .config(config);
        
})();