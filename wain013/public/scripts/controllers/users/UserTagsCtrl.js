'use strict';

/* Controllers */

angular.module('wain013', ['ngSanitize', 'ui.select', 'summernote', 'ngDropzone', 'daterangepicker'])
    .controller('UserTagsCtrl', ['$scope', 'BusinessService', 'UserService', 'ipCookie', '$rootScope', function($scope, BusinessService, UserService,ipCookie,$rootScope) {


        var token = ipCookie('JWT');
        
        $scope.dropzoneOneFileConfig = {
                parallelUploads: 1,
                maxFileSize: 30,
                paramName: "photo",
                headers: { "Authorization": "JWT " + token },
                url: 'http://wain013.com/api/upload/',
                addRemoveLinks: true,
                maxFiles: 1
        };

        $scope.tags = $rootScope.tags;


        $scope.new = {};
        $scope.new.tag = $scope.tags[0];

        $scope.eventsOptions = UserService.queryTags();
        $scope.add = function(){

            console.log($scope.new);
            UserService.postTags($scope.new,function () {
                $scope.eventsOptions = UserService.queryTags();
                $scope.new = {};
                
            });
        }
        
        $scope.delete = function(item){
            console.log(item._id);
            UserService.deleteTags({id: item._id},function (response) {
                
                var index = $scope.eventsOptions.indexOf(item);
                $scope.eventsOptions.splice(index, 1);
                
                if(!response._id){
                    $scope.eventsOptions = UserService.queryTags();
                }
                
            });
        }


    }]);
