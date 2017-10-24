(function () {
    'use strict'
    var blog = {
        templateUrl: '../templates/blog.html',
        controller: ['PostFactory', '$scope', 'MetaService', function (PostFactory, $scope, MetaService) {
            var self = this;
            self.posts = undefined;
            self.loading = true;

            MetaService.reset();

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