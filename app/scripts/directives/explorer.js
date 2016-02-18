window.maidsafeDemo.directive('explorer', ['safeApiFactory', function(safeApi) {

  var Explorer = function($scope, element, attrs) {
    var rootFolder = '/' + ($scope.isPrivate ? 'private' : 'public');
    $scope.currentDirectory = rootFolder;
    $scope.selectedDir = null;
    $scope.dir = null;

    var getDirectory = function () {
      var onResponse = function(err, dir) {
        if (err) {
          return console.error(err);
        }
        $scope.dir = JSON.parse(dir);
        $scope.$applyAsync();
      };
      safeApi.getDir(onResponse, $scope.currentDirectory, false);
    };

    $scope.upload = function(path) {
      var uploader = new window.Uploader(safeApi);
      uploader.upload(path || 'C:\\Users\\Krishna\\Desktop\\Test_REC', $scope.isPrivate, '/public');
    };

    $scope.openDirectory = function(directoryName) {
      $scope.selectedDir = directoryName;
      $scope.currentDirectory += ('/' + $scope.selectedDir);
      getDirectory();
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
      isPrivate: '='
    },
    templateUrl: './views/explorer.html',
    link: Explorer
  };
}]);
