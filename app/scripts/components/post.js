(function () {
    var post = {
        templateUrl: '../templates/post.html',
        controller: ['CommentFactory', function (CommentFactory) {
            var self = this;
            self.commentCount = 0;

            var getCommentCount = function () {
                CommentFactory.getComments(self.post.id).then(
                    function (success) {
                        if (typeof success.val === "function") {
                            self.commentCount = success.val().length;
                        }
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