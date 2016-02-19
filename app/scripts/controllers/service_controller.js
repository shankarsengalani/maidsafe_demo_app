/**
 * Service controller
 */
window.maidsafeDemo.controller('ServiceCtrl', [ '$scope', '$state', 'safeApiFactory', function($scope, $state, safe) {
  'use strict';
  $scope.serviceList = [];
  $scope.newService = null;
  $scope.newServicePath = '/public';
  $scope.progressIndicator = null;

  var longName = safe.getUserLongName();
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

  // explorer init
  $scope.explorerInit = function() {
    $scope.newService = $state.params.serviceName + '.' + longName + '.safenet';
  };

  // set target folder
  $scope.setTargetFolder = function(name) {
    $scope.newServicePath = name;    
  };

  $scope.publishService = function() {
    safe.addService(longName, $state.params.serviceName, false, $scope.newServicePath, function(err, res) {
      if (err) {
        console.error(err);
        return;
      }
      alert('Service published successfully');
      $state.go('manageService');
    });
  };

  $scope.registerProgress = function(progressScope) {
    $scope.progressIndicator = progressScope;
  };

  $scope.onUpload = function(percentage) {
    if (percentage < 100 && !$scope.progressIndicator.show) {
      $scope.progressIndicator.show = true;
    }
    if (percentage === 100) {
      $scope.progressIndicator.show = false;
    }
    $scope.progressIndicator.percentage = Math.floor(percentage);
    console.log(percentage);
  };
} ]);
