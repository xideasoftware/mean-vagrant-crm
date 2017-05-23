'use strict';

/* Controllers */

angular.module('wain013', ['ngSanitize', 'ui.select', 'summernote', 'ngDropzone', 'daterangepicker', 'datetimepicker', 'siyfion.sfTypeahead'])
    // Chart controller 
    .controller('NewBusinessCtrl', ['$scope', '$rootScope', '$sce', '$compile', 'LanguageService', 'BusinessService', '$location','ipCookie',
                                 function($scope, $rootScope, $sce, $compile, LanguageService, BusinessService, $location,ipCookie) {
        
        $scope.languages = $rootScope.languages;
        $scope.language = {};
        
        $scope.error = {};
        $scope.business = {};
        $scope.tags;
        $scope.businessOptions = BusinessService.getBusinessesOptions();
        $scope.businessCategories = BusinessService.getBusinessesCategories();

                                     $scope.beforeRender = function ($view, $dates, $leftDate, $upDate, $rightDate) {
                                         var index = Math.floor(Math.random() * $dates.length);
                                         $dates[index].selectable = false;
                                     }

                                     /* Bindable functions
                                      -----------------------------------------------*/
                                     $scope.endDateBeforeRender = endDateBeforeRender
                                     $scope.endDateOnSetTime = endDateOnSetTime
                                     $scope.startDateBeforeRender = startDateBeforeRender
                                     $scope.startDateOnSetTime = startDateOnSetTime

                                     function startDateOnSetTime () {
                                         $scope.$broadcast('start-date-changed');
                                     }

                                     function endDateOnSetTime () {
                                         $scope.$broadcast('end-date-changed');
                                     }

                                     function startDateBeforeRender ($dates) {
                                         if ($scope.dateRangeEnd) {
                                             var activeDate = moment($scope.dateRangeEnd);

                                             $dates.filter(function (date) {
                                                 return date.localDateValue() >= activeDate.valueOf()
                                             }).forEach(function (date) {
                                                 date.selectable = false;
                                             })
                                         }
                                     }

                                     function endDateBeforeRender ($view, $dates) {
                                         if ($scope.dateRangeStart) {
                                             var activeDate = moment($scope.dateRangeStart).subtract(1, $view).add(1, 'minute');

                                             $dates.filter(function (date) {
                                                 return date.localDateValue() <= activeDate.valueOf()
                                             }).forEach(function (date) {
                                                 date.selectable = false;
                                             })
                                         }
                                     }


        $scope.business.pin = false;
        $scope.status = true;

        $scope.person = {};
        $scope.people = [
            { name: 'Adam', email: 'adam@email.com', age: 12, country: 'United States' },
            { name: 'Amalie', email: 'amalie@email.com', age: 12, country: 'Argentina' },
            { name: 'Estefanía', email: 'estefania@email.com', age: 21, country: 'Argentina' },
            { name: 'Adrian', email: 'adrian@email.com', age: 21, country: 'Ecuador' },
            { name: 'Wladimir', email: 'wladimir@email.com', age: 30, country: 'Ecuador' },
            { name: 'Samantha', email: 'samantha@email.com', age: 30, country: 'United States' },
            { name: 'Nicole', email: 'nicole@email.com', age: 43, country: 'Colombia' },
            { name: 'Natasha', email: 'natasha@email.com', age: 54, country: 'Ecuador' },
            { name: 'Michael', email: 'michael@email.com', age: 15, country: 'Colombia' },
            { name: 'Nicolás', email: 'nicolas@email.com', age: 43, country: 'Colombia' }
        ];


        $scope.availableColors = ['Red', 'Green', 'Blue', 'Yellow', 'Magenta', 'Maroon', 'Umbra', 'Turquoise'];

        $scope.multipleDemo = {};
        $scope.multipleDemo.colors = ['Blue', 'Red'];
        $scope.multipleDemo.selectedPeople = [$scope.people[5], $scope.people[4]];
        $scope.multipleDemo.selectedPeopleWithGroupBy = [$scope.people[8], $scope.people[6]];
        $scope.multipleDemo.selectedPeopleSimple = ['samantha@email.com', 'wladimir@email.com'];                         
                                     
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
        $scope.business.tags = $scope.tags.split(",");
        
        if($scope.status)
        $scope.business.status = "APPROVED";

        //get cover
        if($scope.cover.getAcceptedFiles().length > 0){
            var coverscovers = angular.fromJson($scope.cover.getAcceptedFiles()[0].xhr.response);
            if(coverscovers.photo){
                $scope.business.cover = coverscovers.photo;
            } 
        }
        
        //get images
        var images = $scope.dropzone.getAcceptedFiles();
        var businessimages = [];
        for(var i = 0; i < images.length; i++){
            var image = angular.fromJson(images[i].xhr.response);
            if(image.photo){
                businessimages.push(image.photo);
            } 
            
        }
        if(businessimages.length >0)
        $scope.business.photos = businessimages;
        
        //Error Validation
        $scope.error.title = null;
        $scope.error.body = null;
        $scope.error.cover = null;
        var hasErrorFlag = false;
        
        if(!$scope.business.title){
            $scope.error.title = "This field is required.";
            hasErrorFlag = true;
        }

        if(!$scope.business.body){
            $scope.error.body = "This field is required.";
            hasErrorFlag = true;
        }

        if(!$scope.business.cover){
            $scope.error.cover = "This field is required.";
            hasErrorFlag = true;
        }

        
        if(hasErrorFlag)
         var newBusiness = BusinessService.save($scope.business, function () {
            
            if($redirect){
                $location.path('/businesses/all');
            }else{
                $location.path('/businesses/new');
            }
             
        })

    };



    }]);


