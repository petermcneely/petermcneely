(function () {
    'use strict'

    var commentForm = {
        templateUrl: '../templates/comment.form.html',
        controller: ['CommentFactory', '$state', function (CommentFactory, $state) {
            var self = this;
            self.comment = undefined;

            self.submit = function () {
                self.comment.postId = self.postId;
                self.comment.parentId = self.parentId ? self.parentId : null;
                CommentFactory.createComment(self.comment).then(
                    function (success) {
                        console.log("Successfully created comment.");
                        self.comment = undefined;
                        $state.reload();
                    },
                    function (error) {
                        console.log(error);
                    }
                );
            };
        }],
        bindings: {
            parentId: '<',
            postId: '<',
            onCreate: '&'
        }
    };

    angular
        .module('site')
        .component('commentForm', commentForm);
})();