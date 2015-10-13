'use strict';

angular.module('notify', [
  'ui.router',
  'ngResource'
])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('upload', {
        url:'/',
        templateUrl: 'app/file-upload/upload.html',
        controller: 'UploadCtrl',
        controllerAs: 'uploadCtrl'
      })
      .state('upload.show', {
        url:'/showmembers',
        templateUrl: 'app/file-upload/member-table.html'
      })
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
      });
    })
    .run(function ($rootScope, $state) {
      $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, error){
        event.preventDefault();
        if (error == 'AUTH_REQUIRED') {
        $state.go('login');
        }  
      });
    });

