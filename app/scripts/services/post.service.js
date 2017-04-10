(function () {
    function PostService() {

        var createPost = function (post) {
            var newPostRef = firebase.database().ref("posts").push();
            return newPostRef.set(post);
        };

        var getPosts = function (callbackFn) {
            var postsRef = firebase.database().ref("posts").orderByChild("creationDate");

            return postsRef.once('value');
        };

        return {
            createPost: createPost,
            getPosts: getPosts
        }
    };

    angular
        .module('site')
        .factory('PostService', PostService);
})();