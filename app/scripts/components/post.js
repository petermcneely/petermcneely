(function () {
    'use strict';
    var post = {
        templateUrl: '../templates/post.html',
        controller: ['CommentFactory', 'PostFactory', '$stateParams', '$scope', '$state', 'MetaService', function (CommentFactory, PostFactory, $stateParams, $scope, $state, MetaService) {
            var self = this;
            self.post = undefined;
            self.hasPost = true;
            self.loading = true;
            self.showForm = true;

            var getPost = function () {
                if (typeof $stateParams.title === "string") {
                    PostFactory.getPost($stateParams.title).then(
                        function (success) {
                            if (success !== null) {
                                self.post = success;
                                MetaService.setTitle(self.post.title);
                                MetaService.setDescription(self.post.description);
                                getComments();
                            }
                            else {
                                self.hasPost = false;
                            }
                            self.loading = false;
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
                        self.post.comments = success;
                    },
                    function (error) {
                        console.log(error);
                    }
                );
            };

            self.adminAuth = function () {
                return firebase.auth().currentUser !== null;
            };

            self.deletePost = function () {
                PostFactory.deletePost(self.post.id).then(
                    function (success) {
                        console.log("Post successfully deleted.");
                        $state.go('blog');
                    },
                    function (error) {
                        console.log(error);
                    }
                );
            };

            self.publishPost = function () {
                PostFactory.publishPost(self.post).then(
                    function (success) {
                        console.log("Post successfully published.");
                    },
                    function (error) {
                        console.log(error);
                    }
                );
            }

            self.displayNotFound = function () {
                var logic = !self.loading && (!self.hasPost || !self.adminAuth() && self.post.draft);
                return logic;
            }

            self.$onInit = function () {
                getPost();
            };
        }]
    };

    angular
        .module('site')
        .component('post', post);
})();