'use strict';

/* Controllers */

angular.module('wain013', ['ngSanitize', 'ui.select', 'summernote', 'ngDropzone', 'daterangepicker', 'siyfion.sfTypeahead'])
    .controller('BusinessPendingListCtrl', ['$scope', '$rootScope', 'BusinessService', '$location', function($scope, $rootScope, BusinessService, $location) {




        $scope.languages = $rootScope.languages;

        $scope.summernote_options = {
            height: 200,
            onfocus: function(e) {
                $('body').addClass('overlay-disabled');
            },
            onblur: function(e) {
                $('body').removeClass('overlay-disabled');
            }
        }

        $scope.list = BusinessService.query();
        
        $scope.redirect = function(){
            $location.path('/businesses/new');
        }

        $scope.delete = function(){
            
            $('#myModal').modal('hide');
            BusinessService.remove({id: $scope.delItem._id},function (response) {

                var index = $scope.list.indexOf($scope.delItem);
                $scope.list.splice(index, 1);
                
                $('body').pgNotification({
                        style: 'bar',
                        message: "The item has been deleted successfully!",
                        position: 'top', //'bottom'
                        timeout: 0,
                        type: 'success'
                }).show();
                
            },
            function(err){
                $('body').pgNotification({
                        style: 'bar',
                        message: "Couldn't delete the item :(",
                        position: 'top', //'bottom'
                        timeout: 0,
                        type: 'error'
                }).show();
            })
            
        }

        $scope.publish = function(item){
            item.status = "PUBLISHED";
            BusinessService.update({id: item._id}, item, function (response) {
                $scope.list = BusinessService.query();
                $('body').pgNotification({
                    style: 'bar',
                    message: "The item has been published successfully!",
                    position: 'top', //'bottom'
                    timeout: 0,
                    type: 'success'
                }).show();
            },
            function(err){
                $('body').pgNotification({
                        style: 'bar',
                        message: "Couldn't publish the item :(",
                        position: 'top', //'bottom'
                        timeout: 0,
                        type: 'error'
                }).show();
            })
        }

        $scope.alert = function(item){
            $scope.delItem = item;
            $('#myModal').modal('show');
        }


        $scope.revert = function(){
            $scope.list[$scope.selectedIndex] = $scope.original;
            if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
                $scope.$apply();
            }
        }

        $scope.save = function(item){
            $('#EditModel').modal('hide');

            BusinessService.updateEventsCategory({categoryId: $scope.item._id},$scope.item,function (response) {
                if(!response.ok){
                    $scope.list = EventsService.query();
                }
            })
            //$scope.newIcon.removeAllFiles();
        }
        
        $scope.dzSuccess = function(file, xhr){
            console.log($scope.selectedIndex);
            $scope.item.icon = xhr.photo;
            $scope.$apply();
        }


    }]);
