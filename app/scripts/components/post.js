(function () {
    var post = {
        templateUrl: '../templates/post.html',
        controller: function () {
            var self = this;
        },
        bindings: {
            post: '<',
            showBody: '<'
        }
    };

    angular
        .module('site')
        .component('post', post);
})();