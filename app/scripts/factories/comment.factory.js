(function () {
    'use strict'
    function CommentFactory($q) {
        var createComment = function (comment) {
            var newCommentRef = firebase.database().ref("comments").push();
            return newCommentRef.set(comment);
        };

        var getComments = function (id) {
            var reference = firebase.database().ref("comments");
            return reference.once('value').then(
                function (snapshot) {
                    if (snapshot.hasChild("postId")) {
                        return reference.orderByChild("postId").equalTo(id);
                    }
                    else {
                        var deferred = $q.defer();

                        setTimeout(function () {
                            deferred.resolve(0);
                        }, 0);

                        return deferred.promise;
                    }
                }
            );
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