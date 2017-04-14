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
                        var postsObj = posts.val();
                        self.posts = postsObj ? Object.keys(postsObj).map(function (key) {
                            postsObj[key].creationTime = Date.parse(postsObj[key].creationDate);
                            postsObj[key].id = key;
                            return postsObj[key];
                        }) : null;
                        self.loading = false;
                        $scope.$apply();
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