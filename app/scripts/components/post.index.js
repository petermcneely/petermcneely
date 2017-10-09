(function () {
    var postIndex = {
        templateUrl: '../templates/post.index.html',
        controller: ['CommentFactory', '$scope', '$sce', function (CommentFactory, $scope, $sce) {
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

            self.shouldShow = function () {
                return self.post && (!self.post.draft || (self.post.draft && firebase.auth().currentUser !== null));
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
        .component('postIndex', postIndex);
})();