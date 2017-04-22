(function () {
    'use strict'
    var signIn = {
        templateUrl: '../templates/sign-in.html',
        bindings: {
            modalInstance: '<'
        },
        controller: ['$state', function ($state) {
            var self = this;
            self.email = undefined;
            self.password = undefined;

            self.signIn = function () {
                firebase.auth().signInWithEmailAndPassword(self.email, self.password).then(
                    function (success) {
                        if (self.modalInstance) {
                            self.modalInstance.close("Sign in successful!");
                        }
                        else {
                            $state.go('blog');
                        }
                    },
                    function (error) {
                        if (error.code === 'auth/wrong-password')
                            alert('Wrong password. Please try again.');
                        else
                            alert(error.message);

                        console.log(error);
                    }
                );
            };

            self.cancel = function () {
                if (self.modalInstance) {
                    self.modalInstance.dismiss('User canceled post attempt.');
                }
                else {
                    $state.go('blog');
                }
            };
        }]
    };

    angular
        .module('site')
        .component('signIn', signIn);
})();