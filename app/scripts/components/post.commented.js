(function () {
    'use strict'
    var commentedPost = {
        templateUrl: '../templates/post.commented.html',
        controller: ['CommentFactory', 'PostFactory', '$stateParams', '$scope', function (CommentFactory, PostFactory, $stateParams, $scope) {
            var self = this;
            self.post = undefined;
            self.hasPost = true;
            self.loading = true;
            self.showForm = true;

            var getPost = function () {
                if (typeof $stateParams.title === "string") {
                    PostFactory.getPost($stateParams.title).then(
                        function (success) {
                            if (success.val() !== null) {
                                for (var singleKey in success.val()) {
                                    self.post = success.val()[singleKey];
                                    self.post.id = singleKey;
                                    getComments();
                                    break;
                                }
                            }
                            else {
                                self.hasPost = false;
                            }
                            self.loading = false;
                            $scope.$apply();
                        },
                        function (error) {
                            console.log(error);
                            self.hasPost = false;
                            self.loading = false;
                        }
                    );
                }
            };

            var getComments = function () {
                CommentFactory.getComments(self.post.id).then(
                    function (success) {
                        if (typeof success.val === "function") {
                            var commentsObj = success.val();
                            for (var key in commentsObj) {
                                commentsObj[key].id = key;
                            }
                            self.post.comments = commentsObj;
                            $scope.$apply();
                        }
                        else {
                            self.post.comments = success;
                        }
                    },
                    function (error) {
                        console.log(error);
                    }
                );
            };
            

            self.$onInit = function () {
                getPost();
            };
        }],
    };

    angular
        .module('site')
        .component('commentedPost', commentedPost);
})();