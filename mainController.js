(function () {

  var githubViewer = angular.module("githubViewer");

  var mainController = function (
    $scope,
    $interval,
    $location
  ) {

    var countdownInterval = null;
    $scope.search = function (username) {
      if (countdownInterval) {
        $interval.cancel(countdownInterval);
        $scope.countdown = null;
      }
      $location.path("/user/" + username);
    };

    var decrementCountdown = function () {
      $scope.countdown -= 1;
      if ($scope.countdown < 1) {
        $scope.search($scope.username);
      }
    };

    var startCountdown = function () {
      countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
    };

    $scope.username = "angular";
    $scope.countdown = 5;
    startCountdown();
  };

  githubViewer.controller("MainController", [
    "$scope",
    "$interval",
    "$location",
    mainController
  ]);

})();