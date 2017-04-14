(function () {
    'use strict'
    var comment = {
        templateUrl: '../templates/comment.html',
        controller: function () {
            var self = this;
            
        },
        bindings: {
            comment: '<'
        }
    };

    angular
        .module('site')
        .component('comment', comment);
})();