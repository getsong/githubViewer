(function () {

    var githubViewer = angular.module("githubViewer");

    var userController = function (
        $scope,
        github,
        $routeParams
    ) {
        var onRepos = function (data) {
            $scope.repos = data;
        };

        var onUserComplete = function (data) {
            $scope.user = data;
            github.getRepos($scope.user).then(onRepos, onError);
        };

        var onError = function (error) {
            $scope.error = "Failed to load data. Please try again.";
        };

        $scope.order = function () {
            $scope.sortOrder = $scope.orderOrder + $scope.orderProperty;
        };

        $scope.username = $routeParams.username;
        $scope.orderOrder = "+";
        $scope.orderProperty = "name";
        $scope.order();
        github.getUser($scope.username).then(onUserComplete, onError);
    };

    githubViewer.controller("UserController", [
        "$scope",
        "github",
        "$routeParams",
        userController
    ]);

})();