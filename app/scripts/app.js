(function () {
    function config($stateProvider, $locationProvider, $urlRouterProvider) {
        $locationProvider
            .html5Mode({
                enabled: true,
                requireBase: false
            });

        $urlRouterProvider
            .otherwise('/');

        $stateProvider
            .state('blog', {
                url: '/',
                template: '<blog></blog>'
            })
            .state('about', {
                url: '/about',
                template: '<about></about>'
            })
            .state('resume', {
                url: '/resume',
                template: '<resume></resume>'
            })
            .state('post', {
                url: '/post',
                template: '<post-form></post-form>'
            });
    };

    angular
        .module('site', ['ui.router', 'ui.bootstrap', 'ngAnimate', 'firebase', 'ngSanitize'])
        .config(config);
})();