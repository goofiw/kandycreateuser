'use strict';

angular.module('notify', [
  'ui.router',
  'ngAnimate',
  'firebase',
  'notify.common'
])
  .constant('ENDPOINT_URI', 'https//notifyrocks.firbaseio.com/')
  .config(function ($stateProvider, $urlRouterProvider) {
    urlRouterProvider.otherwise('/notify');

    $stateProvider
      .state('login', {
        url:'/login',
        templateUrl: 'app/login/login.tmpl.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .state('notify', {
        url:'/notify',
        templateUrl: 'app/notify/notify.tmpl.html',
        controller: 'NotifyCtrl',
        controllerAs:'ctrl',
        resolve: {
          'currentUser': ['Auth', function (Auth) {
            return Auth.$requireAuth();
          }]
        }
      })
      .run(function ($rootScope, $state) {
        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState){
          event.preventDefault();
          if (error == 'AUTH_REQUIRED') {
          $state.go('login');
          }  
        });
      });
  });

