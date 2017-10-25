(function () {
    'use strict';

    angular
        .module('site')
        .factory('SearchContentFactory', searchContent);

    searchContent.$inject = ['$http', '$q'];

    function searchContent($http, $q) {
        var service = {
            sitemaps: execute
        };

        var authenticated = false;

        return service;

        function authenticate() {
            return gapi.auth2.getAuthInstance()
                .signIn({ scope: "https://www.googleapis.com/auth/webmasters https://www.googleapis.com/auth/webmasters.readonly" })
                .then(function () {
                    console.log("Sign-in successful");
                }, function (error) {
                    console.error("Error signing in", error);
                });
        }
        function loadClient() {
            return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/webmasters/v3/rest")
                .then(function () {
                    console.log("GAPI client loaded for API");
                }, function (error) {
                    console.error("Error loading GAPI client for API");
                });
        }

        // Make sure the client is loaded and sign-in is complete before calling this method.
        function execute() {
            authenticateAndLoad().then(
                function () {
                    return gapi.client.webmasters.sitemaps.list({siteUrl: 'https://petermcneely.com'})
                        .then(function (response) {
                            // Handle the results here (response.result has the parsed body).
                            console.log("Response", response);
                        }, function (error) {
                            console.error("Execute error", error);
                        });
                }
            );
        }

        function authenticateAndLoad() {
            if (!authenticated) {
                return authenticate().then(
                    loadClient().then(
                        function () {
                            authenticated = true;
                        }
                    )
                );
            }
            else {
                return $q.resolve();
            }
        }
    }
})();