/**
 * Router
 */
window.maidsafeDemo.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('authorise');
  $stateProvider
  .state('authorise', {
      url: '/authorise',
      templateUrl: 'views/authorisation.html'
    })
  .state('home', {
      url: '/home',
      templateUrl: 'views/home.html'
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
      url: '/service_add_files/:serviceName',
      templateUrl: 'views/service_add_files.html'
    })
  .state('serviceExplorer', {
      url: '/service_explorer/:serviceName',
      templateUrl: 'views/service_explorer.html'
    })
  .state('sampleSite', {
      url: '/sample_site/:serviceName',
      templateUrl: 'views/sample_site.html'
    })
});
