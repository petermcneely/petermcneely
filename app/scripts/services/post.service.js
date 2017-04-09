(function () {
    function PostService() {
        var self = this;

        self.posts = [{ title: "First Post", description: "My first post.", body: "My first body." }];
    };

    angular
        .module('site')
        .service('PostService', PostService);
})();