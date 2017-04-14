(function () {
    'use strict'
    var postForm = {
        templateUrl: '../templates/post.form.html',
        controller: ['PostFactory', '$uibModal', '$filter', function (PostFactory, $uibModal, $filter) {
            var self = this;
            self.post = {};

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

            var submitPost = function () {
                self.post.creationDate = new Date().toDateString();
                self.post.urlTitle = $filter('hyphenate')(self.post.title);
                PostFactory.createPost(self.post).then(
                    function (success) {
                        console.log("Post successfully created.");
                        self.post = {};
                    },
                    function (error) {
                        console.log(error);
                    }
                );
            };
        }]
    };

    angular
        .module('site')
        .component('postForm', postForm);
})();