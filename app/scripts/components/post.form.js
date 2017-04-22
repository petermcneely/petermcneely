(function () {
    'use strict'
    var postForm = {
        templateUrl: '../templates/post.form.html',
        controller: ['PostFactory', '$uibModal', '$filter', '$stateParams', '$scope', function (PostFactory, $uibModal, $filter, $stateParams, $scope) {
            var self = this;
            self.editing = false;

            var configurePageTheme = function () {
                if ($stateParams.post) {
                    self.post = $stateParams.post;
                    self.editing = true;
                }
                else {
                    self.post = {};
                }   
            };

            var create = function () {
                self.post.creationDate = new Date().toDateString();
                self.post.urlTitle = $filter('hyphenate')(self.post.title);
                PostFactory.createPost(self.post).then(
                    function (success) {
                        console.log("Post successfully created.");
                        self.post = {};
                        $scope.$apply();
                    },
                    function (error) {
                        console.log(error);
                    }
                );
            };

            var update = function () {
                PostFactory.updatePost(self.post).then(
                    function (success) {
                        console.log("Post successfully updated.");
                    },
                    function (error) {
                        console.log(error);
                    }
                );
            };

            var submitPost = function () {
                if (self.editing) {
                    update();
                }
                else {
                    create();
                }
            };

            self.submit = function () {
                if (!firebase.auth().currentUser) {
                    var modalInstance = $uibModal.open({
                        component: 'signIn'
                    });

                    modalInstance.result.then(function (success) {
                        console.log(success);
                        submitPost();
                    });
                }
                else
                    submitPost();
            };

            self.$onInit = function () {
                configurePageTheme();
            };
        }]
    };

    angular
        .module('site')
        .component('postForm', postForm);
})();