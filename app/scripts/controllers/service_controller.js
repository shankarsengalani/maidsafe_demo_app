/**
 * Service controller
 */
window.maidsafeDemo.controller('ServiceCtrl', [ '$scope', '$state', 'safeApiFactory', function($scope, $state, safe) {
  'use strict';
  $scope.serviceList = [];
  // initialization
  $scope.init = function() {
    safe.getDns(function(err, res) {
      if (err) {
        return console.error(err);
      }
      res = JSON.parse(res);
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
        safe.getServices(longName, function(err, services) {
          if (err) {
            return console.error(err);
          }
          services = JSON.parse(services);
          if (services.length === 0) {
            return console.log('No service registered for ' + longName);
          }
          addServices(longName, services);
        });
      });
      console.log(res);
    });
  };

  // create service
  $scope.createService = function() {
    console.log($scope);
    if (!$scope.serviceName) {
      return console.error('Provide valid service name');
    }
    $state.go('serviceAddFiles', { 'serviceName': $scope.serviceName });
    $scope.serviceName = "";
  };

} ]);
