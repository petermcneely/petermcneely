(function () {
    var blog = {
        templateUrl: '../templates/blog.html',
        controller: ['PostService', '$scope', function (PostService, $scope) {
            var self = this;
            self.posts = undefined;

            var getPosts = function () {
                PostService.getPosts().then(function (posts) {
                    self.posts = posts.val();
                    $scope.$apply();
                });
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