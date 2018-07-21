var githubViewer = angular.module("githubViewer", []);

var infoController = function (
  $scope,
  github,
  $interval,
  $log,
  $anchorScroll,
  $location
) {
  var onRepos = function (data) {
    $scope.repos = data;
    $location.hash("user");
    $anchorScroll();
  };

  var onUserComplete = function (data) {
    $scope.user = data;
    github.getRepos($scope.user).then(onRepos, onError);
  };

  var onError = function (error) {
    $scope.error = "Failed to load data. Please try again.";
  };

  var countdownInterval = null;
  $scope.search = function () {
    $log.info("searching for " + $scope.username);
    github.getUser($scope.username).then(onUserComplete, onError);
    if (countdownInterval) {
      $interval.cancel(countdownInterval);
      $scope.countdown = null;
    }
  };

  $scope.order = function () {
    $scope.sortOrder = $scope.orderOrder + $scope.orderProperty;
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
  $scope.message = "Get Information about GitHub User";
  $scope.orderOrder = "+";
  $scope.orderProperty = "name";
  $scope.sortOrder = $scope.orderOrder + $scope.orderProperty;
  $scope.countdown = 5;
  startCountdown();
};

githubViewer.controller("infoController", [
  "$scope",
  "github",
  "$interval",
  "$log",
  "$anchorScroll",
  "$location",
  infoController
]);
