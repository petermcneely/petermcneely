(function () {
    'use strict'
    var blog = {
        templateUrl: '../templates/blog.html',
        controller: ['PostFactory', '$scope', function (PostFactory, $scope) {
            var self = this;
            self.posts = undefined;
            self.loading = true;

            var getPosts = function () {
                PostFactory.getPosts().then(
                    function (posts) {
                        self.posts = posts;
                        self.loading = false;
                    },
                    function (error) {
                        console.log(error);
                        self.loading = false;
                    }
                );
            };

            self.$onInit = function () {
                getPosts();
            };
        }]
    };

    angular
        .module('site')
        .component('blog', blog);
})();