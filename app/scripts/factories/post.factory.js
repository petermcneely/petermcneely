(function () {
    'use strict'
    function PostFactory($q) {

        var createPost = function (post) {
            var newPostRef = firebase.database().ref("posts").push();
            return newPostRef.set(post);
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
            var postRef = firebase.database().ref("posts").orderByChild("urlTitle").equalTo(title);
            return postRef.once('value');
        };

        return {
            createPost: createPost,
            getPosts: getPosts,
            getPost: getPost
        };
    };

    angular
        .module('site')
        .factory('PostFactory', ['$q', PostFactory]);
})();