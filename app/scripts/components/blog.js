(function () {
    var blog = {
        templateUrl: '../templates/blog.html',
        controller: ['PostService', function (PostService) {
            var self = this;
            self.posts = PostService.posts;
        }]
    };

    angular
        .module('site')
        .component('blog', blog);
})();