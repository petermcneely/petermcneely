(function () {
    var navBar = {
        templateUrl: '../templates/navbar.html',
        controller: function () {
            var self = this;
            self.switch = false;
        }
    };

    angular
        .module('site')
        .component('navBar', navBar);
})();