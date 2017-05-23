'use strict';

/* Controllers */

angular.module('wain013', ['ngSanitize', 'ui.select', 'summernote', 'ngDropzone', 'daterangepicker', 'siyfion.sfTypeahead'])
    .controller('ContentsPendingListCtrl', ['$scope', '$rootScope', 'ContentService','ipCookie', function($scope, $rootScope, ContentService,ipCookie) {


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

        $scope.languages = $rootScope.languages;
        $scope.language = {};
        $scope.addItem = {};
        $scope.addItem.selected = $scope.languages[0];

        $scope.summernote_options = {
            height: 200,
            onfocus: function(e) {
                $('body').addClass('overlay-disabled');
            },
            onblur: function(e) {
                $('body').removeClass('overlay-disabled');
            }
        }


        $scope.eventsOptions = ContentService.query();/*function(response){
            $scope.selected = response[0];
        });*/
        
        $scope.showModal = function() {
            $('#addNewAppModal').modal('show');
        }
        
        $scope.editModal = function(item, index) {
            
            $scope.selectedIndex = index;
            $scope.original = angular.copy(item);
            console.log($scope.original);
            $scope.item = item;
            $('#EditModel').modal('show');
            
        }
        
        var defaultColor = "#6d5cae";
        $scope.icon;
        $scope.addColor = defaultColor;
        
        
        
        
        $scope.add = function(){

            if($scope.icon.getAcceptedFiles().length > 0){
                var iconcovers = angular.fromJson($scope.icon.getAcceptedFiles()[0].xhr.response);
                if(iconcovers.photo){
                    $scope.iconPhoto = iconcovers.photo;
                } 
            }
            
            var item = {
                name:{
                    arabic: $scope.addArabicCategory,
                    english: $scope.addEnglishCategory
                },
                color: $scope.addColor,
                icon: $scope.iconPhoto
            }

            if($scope.addItem.selected){
                    item.parent=$scope.addItem.selected;
            }


            ContentService.addEventsCategory(item,function () {
                $scope.eventsOptions = ContentService.query();
                $('#addNewAppModal').modal('hide');
                
                //Reset The From
                $scope.addArabicCategory = "";
                $scope.addEnglishCategory = "";
                $scope.addColor = defaultColor;
                $scope.addItem.selected = null;
                console.log($scope.icon);
                $scope.icon.removeAllFiles();
                
            });
        }
        
        
        
        
        $scope.delete = function(item){
            ContentService.removeEventsCategory({categoryId: item._id},function (response) {
                
                var index = $scope.eventsOptions.indexOf(item);
                $scope.eventsOptions.splice(index, 1);
                
                if(!response._id){
                    $scope.eventsOptions = ContentService.query();
                }
                
            });
        }


        $scope.revert = function(){
            $scope.eventsOptions[$scope.selectedIndex] = $scope.original;
            if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
                $scope.$apply();
            }
        }

        $scope.save = function(item){
            $('#EditModel').modal('hide');

            ContentService.updateEventsCategory({categoryId: $scope.item._id},$scope.item,function (response) {
                if(!response.ok){
                    $scope.eventsOptions = ContentService.query();
                }
            })
            
            $scope.newIcon.removeAllFiles();
        }
        
        $scope.dzSuccess = function(file, xhr){
            console.log($scope.selectedIndex);
            $scope.item.icon = xhr.photo;
            $scope.$apply();
        }


    }]);
