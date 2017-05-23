'use strict';

angular.module('wain013')
    .controller('DashboardCtrl', function ($ocLazyLoad, $scope, $http) {

        $http.get('localhost:3000/api/articles')
            .suecces(function (res) {
                    console.log(res);
            })
            .error(function (res) {
               console.log(res)     
            });

        console.log("DashboardCtrl");
        $ocLazyLoad.load(['assets/plugins/morris/morris.min.js',
                'assets/plugins/morris/morris.css',
                'assets/plugins/sweetalert/dist/sweetalert.css',
                'assets/plugins/raphael/raphael-min.js',
                'assets/plugins/sweetalert/dist/sweetalert.min.js',
                'assets/pages/jquery.todo.js',
                'assets/pages/jquery.chat.js',
                'assets/plugins/peity/jquery.peity.min.js',
                'assets/pages/jquery.dashboard_2.js'],
            {cache: false, timeout: 5000});
    });
