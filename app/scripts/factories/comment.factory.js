(function () {
    'use strict'
    function CommentFactory($q) {

        

        var createComment = function (comment) {
            var newCommentRef = firebase.database().ref("comments").push();
            return newCommentRef.set(comment);
        };

        // Needs to be ordered by generation.
        var createCommentTree = function (commentBank) {
            for (var i = commentBank.length - 1; i > -1; --i) {

                var comment = commentBank[i];
                if (comment.parentId) {

                    var parent = undefined;
                    for (var j = 0; j < commentBank.length; ++j) {
                        if (commentBank[j].id === comment.parentId)
                            parent = commentBank[j];
                    }

                    if (parent) {
                        if (!parent.replies) {
                            parent.replies = [];
                        }

                        parent.replies.push(angular.copy(comment));
                        commentBank.splice(i, 1);
                    }
                }
            }

            return commentBank;
        };
        
        var compare = function (left, right) {
            if (left.generation < right.generation) {
                return -1;
            }
            else if (left.generation > right.generation) {
                return 1;
            }
            else {
                return 0;
            }
        };

        var getComments = function (id) {
            var reference = firebase.database().ref("comments").orderByChild("postId").equalTo(id);
            var deferred = $q.defer();

            reference.once('value').then(
                function (success) {
                    if (typeof success.val === "function") {
                        var commentsObj = success.val();
                        var comments = commentsObj ? Object.keys(commentsObj).map(function (key) {
                            commentsObj[key].id = key;
                            return commentsObj[key];
                        }) : null;
                        if (comments) {
                            comments.sort(compare);
                            comments = createCommentTree(comments);
                        }
                        deferred.resolve(comments);
                    }
                },
                function (error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        };

        var getCommentCount = function (id) {
            var reference = firebase.database().ref("comments").orderByChild("postId").equalTo(id);
            var deferred = $q.defer();

            reference.once('value').then(
                function (success) {
                    if (typeof success.val === "function") {
                        var commentsObj = success.val();
                        if (commentsObj) {
                            deferred.resolve(Object.keys(commentsObj).length);
                        }
                        else {
                            deferred.resolve(0);
                        }
                    }
                },
                function (error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        };

        return {
            createComment: createComment,
            getComments: getComments,
            getCommentCount: getCommentCount
        };
    };

    angular
        .module('site')
        .factory('CommentFactory', ['$q', CommentFactory]);
})();