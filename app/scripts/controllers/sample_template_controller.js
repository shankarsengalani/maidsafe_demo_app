/**
 * Sample site controller
 */
window.maidsafeDemo.controller('SampleTemplateCtrl', [ '$scope', 'safeApiFactory', function($scope, safe) {
  'use strict';
  $scope.siteTitle = 'My Page';
  $scope.siteDesc = 'This page is created and published on the SAFE Network using the SAFE Uploader';

  $scope.publish = function() {
    console.log($scope.siteTitle + " " + $scope.siteDesc);
  };

} ]);
