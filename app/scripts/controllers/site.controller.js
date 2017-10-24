(function () {
    'use strict';

    angular
        .module('site')
        .controller('siteCtrl', siteCtrl);

    siteCtrl.$inject = ['$rootScope', 'MetaService'];

    function siteCtrl($rootScope, MetaService) {
        $rootScope.metaService = MetaService;
    }
})();
