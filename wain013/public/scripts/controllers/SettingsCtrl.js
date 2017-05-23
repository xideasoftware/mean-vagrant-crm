'use strict';

/* Controllers */

angular.module('wain013', ['ngSanitize', 'ui.select', 'summernote', 'ngDropzone', 'daterangepicker', 'siyfion.sfTypeahead'])
    // Chart controller 
    .controller('SettingsCtrl', ['$scope', '$rootScope', '$sce', '$compile', 'LanguageService', 'ArticleService', '$location','ipCookie',
                                 function($scope, $rootScope, $sce, $compile, LanguageService, ArticleService, $location,ipCookie) {
        
        $scope.languages = $rootScope.languages;
        $scope.language = {};
        
        $scope.error = {};
        $scope.story = {};
        $scope.tags;
        
        $scope.story.pin = false;
        $scope.status = true;
                                     
                                     
        $scope.trustAsHtml = function(value) {
            return $sce.trustAsHtml(value);
        };

        $scope.summernote_options = {
            height: 200,
            onfocus: function(e) {
                $('body').addClass('overlay-disabled');
            },
            onblur: function(e) {
                $('body').removeClass('overlay-disabled');
            }
        }

        $scope.focus = function(e) {
            $('body').addClass('overlay-disabled');
        };
        $scope.blur = function(e) {
            $('body').removeClass('overlay-disabled');
        };

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
                                     

        
    $scope.create = function ($redirect) {
        
        if($scope.tags)
        $scope.story.tags = $scope.tags.split(",");
        
        if($scope.status)
        $scope.story.status = "APPROVED";

        //get cover
        if($scope.cover.getAcceptedFiles().length > 0){
            var coverscovers = angular.fromJson($scope.cover.getAcceptedFiles()[0].xhr.response);
            if(coverscovers.photo){
                $scope.story.cover = coverscovers.photo;
            } 
        }
        
        //get images
        var images = $scope.dropzone.getAcceptedFiles();
        var storyimages = [];
        for(var i = 0; i < images.length; i++){
            var image = angular.fromJson(images[i].xhr.response);
            if(image.photo){
                storyimages.push(image.photo);
            } 
            
        }
        if(storyimages.length >0)
        $scope.story.photos = storyimages;
        
        //Error Validation
        $scope.error.title = null;
        $scope.error.body = null;
        $scope.error.cover = null;
        var hasErrorFlag = false;
        
        if(!$scope.story.title){
            $scope.error.title = "This field is required.";
            hasErrorFlag = true;
        }

        if(!$scope.story.body){
            $scope.error.body = "This field is required.";
            hasErrorFlag = true;
        }

        if(!$scope.story.cover){
            $scope.error.cover = "This field is required.";
            hasErrorFlag = true;
        }

        
        if(!hasErrorFlag)
         var newArticle = ArticleService.save($scope.story, function () {
            
            if($redirect){
                $location.path('/articles/pending');
            }else{
                $location.path('/articles/new');
            }
             
        })

    };



    }]);


