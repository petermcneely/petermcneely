(function () {
    'use strict'

    var hyphenate = function () {
        return function (input) {
            var pattern = /[ ?\\\.;:&]+/g;
            if (typeof input.replace === "function") {
                var hyphenated = input.replace(pattern, "-").toLowerCase();
                return hyphenated;
            }
            return input;
        };
    };

    angular
        .module('site')
        .filter('hyphenate', hyphenate);
})();