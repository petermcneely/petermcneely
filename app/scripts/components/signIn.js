(function () {
    var signIn = {
        templateUrl: '../templates/signIn.html',
        bindings: {
            modalInstance: '<'
        },
        controller: function () {
            var self = this;
            self.email = undefined;
            self.password = undefined;

            self.signIn = function () {
                firebase.auth().signInWithEmailAndPassword(self.email, self.password).then(
                    function (success) {
                        self.modalInstance.close("Sign in successful!");
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
        }
    };

    angular
        .module('site')
        .component('signIn', signIn);
})();