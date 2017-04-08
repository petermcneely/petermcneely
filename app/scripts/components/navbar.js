(function () {
    var navBar = {
        templateUrl: '../templates/navBar.html',
        controller: function () {
            var self = this;
            self.switch = false;
        }
    };

    angular
        .module('site')
        .component('navBar', navBar);
})();