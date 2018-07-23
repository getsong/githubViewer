(function () {

    var app = angular.module("githubViewer", ["ngRoute"]);

    app.config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "main.html",
                controller: "MainController"
            })
            .otherwise({ redirectTo: "/main" });
    });

})();