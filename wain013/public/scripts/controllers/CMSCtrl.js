'use strict';

/* Controllers */

angular.module('wain013', ['ngSanitize', 'ui.select', 'summernote', 'ngDropzone', 'daterangepicker', 'siyfion.sfTypeahead'])
    // Chart controller 
    .controller('CMSCtrl', ['$scope', 'ipCookie',
                                 function($scope, ipCookie) {

        var token = ipCookie('JWT');

        $scope.dropzoneConfig = {
                parallelUploads: 3,
                maxFileSize: 30,
                paramName: "photo",
                headers: { "Authorization": "JWT " + token },
                url: 'http://wain013.com/api/upload/',
                addRemoveLinks: true
        };

        $scope.dropzoneOneFileConfig = {
                parallelUploads: 1,
                maxFileSize: 30,
                paramName: "photo",
                headers: { "Authorization": "JWT " + token },
                url: 'http://wain013.com/api/upload/',
                addRemoveLinks: true,
                maxFiles: 1
        };  
                                     
        $scope.result = "result";
        $scope.resultmultiple = "result";
                                     
       $scope.dzSuccess = function(file, xhr){

           $scope.result = xhr.photo;
           $scope.$apply();
            
        }

       $scope.showPhotos = function(){
        var images = $scope.cover.getAcceptedFiles();
        var storyimages = [];
        for(var i = 0; i < images.length; i++){
            var image = angular.fromJson(images[i].xhr.response);
            if(image.photo){
                storyimages.push(image.photo);
            } 
            
        }
        if(storyimages.length >0)
            $scope.resultmultiple = storyimages;

        }


    }]);


