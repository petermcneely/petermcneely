(function () {
    'use strict'
    function PostFactory() {

        var createPost = function (post) {
            var newPostRef = firebase.database().ref("posts").push();
            return newPostRef.set(post);
        };

        var getPosts = function () {
            var postsRef = firebase.database().ref("posts").orderByChild("creationDate");
            return postsRef.once('value');
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
        .factory('PostFactory', PostFactory);
})();