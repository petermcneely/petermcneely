(function () {
    var post = {
        templateUrl: '../templates/post.html',
        controller: function () {
            var self = this;
        },
        bindings: {
            post: '<'
        }
    };

    angular
        .module('site')
        .component('post', post);
})();