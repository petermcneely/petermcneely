(function () {
    var post = {
        templateUrl: '../templates/post.html',
        controller: ['CommentFactory', '$scope', function (CommentFactory, $scope) {
            var self = this;
            self.commentCount = 0;

            var getCommentCount = function () {
                CommentFactory.getCommentCount(self.post.id).then(
                    function (success) {
                        self.commentCount = success;
                    },
                    function (error) {
                        console.log(error);
                    }
                );
            };


            self.$onInit = function () {
                getCommentCount();
            };
        }],
        bindings: {
            post: '<',
            showBody: '<'
        }
    };

    angular
        .module('site')
        .component('post', post);
})();