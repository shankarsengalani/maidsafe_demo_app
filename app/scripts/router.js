/**
 * Router
 */
window.maidsafeDemo.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
  .state('/', {
      url: '/',
      templateUrl: 'views/landing.html'
    })
  .state('publicID', {
      url: '/manage_public_id',
      templateUrl: 'views/manage_public_id.html'
    })
  .state('manageService', {
      url: '/manage_service',
      templateUrl: 'views/manage_service.html'
    })
  .state('createService', {
      url: '/create_service',
      templateUrl: 'views/create_service.html'
    })
  .state('serviceAddFiles', {
      url: '/service_add_files',
      templateUrl: 'views/service_add_files.html'
    })
  .state('serviceExplorer', {
      url: '/service_explorer',
      templateUrl: 'views/service_explorer.html'
    })
});
