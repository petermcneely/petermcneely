(function () {
    var postCreate = {
        templateUrl: '../templates/post.create.html',
        controller: ['PostService', function (PostService) {
            var self = this;
            self.post = {};

            self.submit = function () {
                PostService.posts.push(self.post);
                self.post = {};
            };
        }]
    };

    angular
        .module('site')
        .component('postCreate', postCreate);
})();