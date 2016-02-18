window.maidsafeDemo.directive('explorer', ['safeApiFactory', function(safeApi) {

  var Explorer = function($scope, element, attrs) {
    var rootFolder = '/' + ($scope.isPrivate ? 'private' : 'public');
    $scope.currentDirectory = rootFolder;
    $scope.selectedDir = null;
    $scope.dir = null;

    var getDirectory = function() {
      var onResponse = function(err, dir) {
        if (err) {
          return console.error(err);
        }
        console.log(dir);
        $scope.dir = JSON.parse(dir);
        $scope.$applyAsync();
      };
      safeApi.getDir(onResponse, $scope.currentDirectory, false);
    };

    $scope.upload = function(path) {
      var dialog = require('remote').dialog;
      dialog.showOpenDialog({
        title: 'Select Directory for upload',
        properties: ['openDirectory']
      }, function(folders) {
        if (folders.length === 0) {
          return;
        }
        // TODO instead of binding uploader to window use require
        var uploader = new window.Uploader(safeApi);
        uploader.upload(folders[0], $scope.isPrivate, $scope.currentDirectory);
      });
    };

    $scope.openDirectory = function(directoryName) {
      $scope.selectedDir = directoryName;
      $scope.currentDirectory += ('/' + $scope.selectedDir);
      getDirectory();
    };

    $scope.directorySelect = function(directoryName) {
      $scope.selectedDir = directoryName;
      if (!$scope.onDirectorySelected) {
        return;
      }
      $scope.onDirectorySelected({
        name: $scope.currentDirectory + '/' + $scope.selectedDir
      });
    };

    $scope.back = function() {
      var tokens = $scope.currentDirectory.split('/');
      tokens.pop();
      var path = tokens.join('/');
      if (!path) {
        return;
      }
      $scope.currentDirectory = path;
      $scope.selectedDir = null;
      getDirectory();
    };

    getDirectory();
  };

  return {
    restrict: 'E',
    scope: {
      isPrivate: '=',
      onDirectorySelected: '&'
    },
    templateUrl: './views/explorer.html',
    link: Explorer
  };
}]);
