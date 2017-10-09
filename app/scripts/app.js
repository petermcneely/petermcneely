(function () {
    'use strict';
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
            .state('postForm', {
                url: '/post',
                params: { post: null },
                template: '<post-form></post-form>'
            })
            .state('post', {
                url: '/post/{title}',
                template: '<post></post>'
            })
            .state('signIn', {
                url: '/sign-in',
                template: '<sign-in></sign-in>'
            });
    }

    angular
        .module('site', ['ui.router', 'ui.bootstrap', 'ngAnimate', 'firebase', 'ngSanitize'])
        .config(config);
})();