/**
 * Sample site controller
 */
window.maidsafeDemo.controller('SampleTemplateCtrl', [ '$scope', '$http', '$state', 'safeApiFactory', function($scope, $http, $state, safe) {
  'use strict';
  $scope.siteTitle = 'My Page';
  $scope.siteDesc = 'This page is created and published on the SAFE Network using the SAFE Uploader';
  var filePath = '/views/sample_template_layout.html';

  var writeFile = function(title, content, filePath) {
    window.uiUtils.createTemplateFile(title, content, filePath, function(err, tempPath) {
      if (err) {
        return console.error(err);
      }
      var path = require('path');
      var uploader = new window.uiUtils.Uploader(safe);
      var progress = uploader.upload(tempPath, false, '/public');
      progress.onUpdate = function() {
        if (progress.total === (progress.completed + progress.failed)) {
          safe.addService(safe.getUserLongName(), $state.params.serviceName, false, '/public/' + path.basename(tempPath), function(err) {
            if (err) {
              return console.error(err);
            }
            alert('File published');
            $state.go('manageService');
          });
        }
      }
      console.log(tempPath);
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
