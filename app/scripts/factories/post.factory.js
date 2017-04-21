(function () {
    'use strict'
    function PostFactory($sce, $q) {

        var createPost = function (post) {
            var newPostRef = firebase.database().ref("posts").push();
            return newPostRef.set(post);
        };

        var trustPostBody = function (post) {
            post.body = $sce.trustAsHtml(post.body);
        };

        var getPosts = function () {
            var postsRef = firebase.database().ref("posts").orderByChild("creationDate");
            var deferred = $q.defer();

            postsRef.once('value').then(
                function (posts) {
                    var postsObj = posts.val();
                    var postsArray = postsObj ? Object.keys(postsObj).map(function (key) {
                        postsObj[key].creationTime = Date.parse(postsObj[key].creationDate);
                        postsObj[key].id = key;
                        trustPostBody(postsObj[key]);
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
                            post.id = singleKey;
                        }
                        trustPostBody(post);
                        deferred.resolve(post);
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
            getPost: getPost
        };
    };

    angular
        .module('site')
        .factory('PostFactory', ['$sce', '$q', PostFactory]);
})();