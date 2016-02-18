window.maidsafeDemo.directive('explorer', ['safeApiFactory', function(safeApi) {

  var Explorer = function($scope, element, attrs) {
    var rootFolder = '/' + ($scope.isPrivate ? 'private' : 'public');
    $scope.currentFolder = rootFolder;
    $scope.selectedDir = null;
    $scope.dir = null;

    var getDirectory = function () {
      var onResponse = function(err, dir) {
        if (err) {
          return console.error(err);
        }
        $scope.dir = dir;
        // $scope.$apply();
      };
      safeApi.getDir(onResponse, $scope.currentFolder +
        ($scope.selectedDir ? ('/' + $scope.selectedDir) : ''), false);
    };

    $scope.upload = function(path) {
      var uploader = new window.Uploader(safeApi);
      uploader.upload(path || 'C:\\Users\\Krishna\\Desktop\\Test_REC', $scope.isPrivate, '/private');
    };

    $scope.isDirectoryEmpty = function() {
      return true;
    }

    $scope.openDirectory = getDirectory;

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
