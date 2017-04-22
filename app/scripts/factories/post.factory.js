(function () {
    'use strict'
    function PostFactory($sce, $q) {

        var createPost = function (post) {
            var newPostRef = firebase.database().ref("posts").push();
            return newPostRef.set(post);
        };

        var updatePost = function (post) {
            var databaseRef = firebase.database().ref();

            var postId = post.id;
            manipulateForDatabase(post);
            var updates = {};
            updates['/posts/' + postId] = post;

            return databaseRef.update(updates);
        };

        var deletePost = function (postId) {
            return firebase.database().ref("/posts/" + postId).remove();
        };

        var manipulateFromDatabase = function (post, key) {
            post.creationTime = Date.parse(post.creationDate);
            post.id = key;
            post.trustedBody = $sce.trustAsHtml(post.body);
        };

        var manipulateForDatabase = function (post) {
            delete post.id;
            delete post.creationTime;
            delete post.trustedBody;
        };

        var getPosts = function () {
            var postsRef = firebase.database().ref("posts").orderByChild("creationDate");
            var deferred = $q.defer();

            postsRef.once('value').then(
                function (posts) {
                    var postsObj = posts.val();
                    var postsArray = postsObj ? Object.keys(postsObj).map(function (key) {
                        manipulateFromDatabase(postsObj[key], key);
                        return postsObj[key];
                    }) : null;

                    deferred.resolve(postsArray);
                },
                function (error) {
                    deferred.reject(error);
                }
            );
            return deferred.promise;
        };

        var getPost = function (title) {
            var deferred = $q.defer();
            var postRef = firebase.database().ref("posts").orderByChild("urlTitle").equalTo(title);

            postRef.once('value').then(
                function (success) {
                    if (success.val() !== null) {
                        for (var singleKey in success.val()) {
                            var post = success.val()[singleKey];
                            manipulateFromDatabase(post, singleKey);
                            deferred.resolve(post);
                            break;
                        }
                    }
                    else {
                        deferred.resolve(null);
                    }
                },
                function (error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        };

        return {
            createPost: createPost,
            getPosts: getPosts,
            getPost: getPost,
            updatePost: updatePost,
            deletePost: deletePost
        };
    };

    angular
        .module('site')
        .factory('PostFactory', ['$sce', '$q', PostFactory]);
})();