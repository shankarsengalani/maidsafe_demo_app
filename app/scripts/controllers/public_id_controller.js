/**
 * Public ID controller
 */
window.maidsafeDemo.controller('PublicIdCtrl', [ '$scope', 'safeApiFactory', function($scope, safe) {
  'use strict';
  $scope.publicId = '';
  $scope.longName = null;

  $scope.init = function() {
    var longName = safe.getUserLongName();
    if (longName) {
      $scope.longName = longName;
    }
  };

  $scope.createPublicId = function() {
    if (!$scope.publicId) {
      return console.error('Please enter a valid Public ID');
    }
    var confirm = window.confirm('Your public ID is ' + $scope.publicId);
    if (!confirm) {
      return;
    }
    safe.createPublicId($scope.publicId, function(err, res) {
      if (err) {
        return console.log(err);
      }
      safe.setUserLongName($scope.publicId);
      $scope.publicId = '';
      $scope.init();
      console.log(res);
    });
    console.log($scope.publicId);
  };

} ]);
