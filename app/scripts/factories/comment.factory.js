(function () {
    'use strict'
    function CommentFactory($q) {

        var createComment = function (comment) {
            var newCommentRef = firebase.database().ref("comments").push();
            return newCommentRef.set(comment);
        };

        var getComments = function (id) {
            var reference = firebase.database().ref("comments").orderByChild("postId").equalTo(id);
            return reference.once('value');
        };

        return {
            createComment: createComment,
            getComments: getComments
        };
    };

    angular
        .module('site')
        .factory('CommentFactory', ['$q', CommentFactory]);
})();