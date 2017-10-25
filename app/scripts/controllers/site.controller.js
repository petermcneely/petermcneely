(function () {
    'use strict';

    angular
        .module('site')
        .controller('siteCtrl', siteCtrl);

    siteCtrl.$inject = ['$rootScope', 'MetaService', 'SearchContentFactory'];

    function siteCtrl($rootScope, MetaService, SearchContentFactory) {
        $rootScope.metaService = MetaService;
        $rootScope.searchContentFactory = SearchContentFactory;

        var client_id = '672771660775-p4sc645s0769u530ia62lepao7ju32js.apps.googleusercontent.com';

        gapi.load("client:auth2", function () {
            gapi.auth2.init({ client_id: client_id });
        });
    }
})();
