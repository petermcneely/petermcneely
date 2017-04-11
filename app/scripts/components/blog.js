(function () {
    var blog = {
        templateUrl: '../templates/blog.html',
        controller: ['PostService', '$scope', function (PostService, $scope) {
            var self = this;
            self.posts = undefined;

            var getPosts = function () {
                PostService.getPosts().then(function (posts) {
                    var postsObj = posts.val();
                    self.posts = postsObj ? Object.keys(postsObj).map(function (key) {
                        postsObj[key].creationTime = Date.parse(postsObj[key].creationDate);
                        return postsObj[key];
                    }) : null;
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