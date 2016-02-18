/**
 * Public ID controller
 */
window.maidsafeDemo.controller('PublicIdCtrl', [ '$scope', 'safeApiFactory', function($scope, safe) {
  'use strict';
  $scope.publicId = '';

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
      $scope.publicId = '';
      console.log(res);
    });
    console.log($scope.publicId);
  };

} ]);
