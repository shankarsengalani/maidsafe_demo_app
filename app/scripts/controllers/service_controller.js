/**
 * Service controller
 */
window.maidsafeDemo.controller('ServiceCtrl', [ '$scope', 'safeApiFactory', function($scope, safe) {
  'use strict';
  $scope.serviceList = [];

  // initialization
  $scope.init = function() {
    safe.getDns(function(err, res) {
      if (err) {
        return console.error(err);
      }
      if (res.length === 0) {
        return console.log('No Public ID registered');
      }
      var addServices = function(longName, services) {
        services.forEach(function(ser) {
          $scope.serviceList.push({
            longName: longName,
            name: ser
          });
        });
      };
      res.forEach(function(longName) {
        safe.getServices(longName, function(err, res) {
          if (err) {
            return console.error(err);
          }
          if (res.length === 0) {
            return console.log('No service registered for ' + longName);
          }
          addServices(longName, res);
        });
      });
      console.log(res);
    });
  };
} ]);
