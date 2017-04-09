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
            .state('postCreate', {
                url: '/post/create',
                template: '<post-create></post-create>'
            });
    };

    angular
        .module('site', ['ui.router'])
        .config(config);
        
})();