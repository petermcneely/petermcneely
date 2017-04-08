(function () {
    var blog = {
        templateUrl: '../templates/blog.html',
        controller: function () {
            var self = this;
        }
    };

    angular
        .module('site')
        .component('blog', blog);
})();