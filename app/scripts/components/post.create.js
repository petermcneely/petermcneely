(function () {
    var postCreate = {
        templateUrl: '../templates/post.create.html',
        controller: ['PostService', '$uibModal', function (PostService, $uibModal) {
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
                PostService.createPost(self.post).then(
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
        .component('postCreate', postCreate);
})();