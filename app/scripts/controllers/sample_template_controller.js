/**
 * Sample site controller
 */
window.maidsafeDemo.controller('SampleTemplateCtrl', [ '$scope', '$http', 'safeApiFactory', function($scope, $http, safe) {
  'use strict';
  $scope.siteTitle = 'My Page';
  $scope.siteDesc = 'This page is created and published on the SAFE Network using the SAFE Uploader';
  var filePath = '/views/sample_template_layout.html';

  var writeFile = function(title, content, filePath) {
    window.uiUtils.createTemplateFile(title, content, filePath, function(err, data) {
      if (err) {
        return console.error(err);
      }
      console.log(data);
    });
  };

  $scope.publish = function() {
    console.log($scope.siteTitle + " " + $scope.siteDesc);
    writeFile($scope.siteTitle, $scope.siteDesc, filePath);
  };

  $scope.handleInputClick = function(e) {
    e.stopPropagation();
    e.target.select();
  }

} ]);
