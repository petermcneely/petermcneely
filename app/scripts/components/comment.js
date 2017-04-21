(function () {
    'use strict'
    var comment = {
        templateUrl: '../templates/comment.html',
        controller: function () {
            var self = this;
            self.replyingCommentId = undefined;

            self.toggleReply = function (id) {
                self.replyingCommentId = id;
                self.onCommenting({ value: id ? false : true });
            };

            self.isReplying = function (id) {
                return self.replyingCommentId === id;
            };
            
        },
        bindings: {
            post: '<',
            onCommenting: '&'
        }
    };

    angular
        .module('site')
        .component('comment', comment);
})();