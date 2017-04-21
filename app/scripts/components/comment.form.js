(function () {
    'use strict'

    var commentForm = {
        templateUrl: '../templates/comment.form.html',
        controller: ['CommentFactory', '$state', function (CommentFactory, $state) {
            var self = this;
            self.comment = undefined;

            self.submit = function () {
                self.comment.postId = self.postId;
                self.comment.parentId = self.parent ? self.parent.id : null;
                self.comment.generation = self.parent ? self.parent.generation + 1 : 1;
                self.comment.creationDate = Date.now();
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

            self.cancel = function () {
                self.onCancel();
            };
        }],
        bindings: {
            parent: '<',
            postId: '<',
            showCancel: '<',
            onCreate: '&',
            onCancel: '&'
        }
    };

    angular
        .module('site')
        .component('commentForm', commentForm);
})();