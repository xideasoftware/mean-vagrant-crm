'use strict';

/* Controllers */

angular.module('wain013', ['ngSanitize', 'ui.select', 'summernote', 'ngDropzone', 'daterangepicker'])
    .controller('AdminUsersListCtrl', ['$scope', 'BusinessService', 'UserService', 'ipCookie', '$rootScope', function($scope, BusinessService, UserService,ipCookie,$rootScope) {


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
        $scope.userTypes = ["Admin"];
        $scope.subscriptions = ["Free","Premium","Premium Plus"];
        $scope.statusList = ["ACTIVE","PENDING","BLOCKED"];


        $scope.new = {};
        $scope.new.language = $scope.languages[0];
        $scope.new.subscription = $scope.subscriptions[0];
        $scope.new.userType = $scope.userTypes[0];
        $scope.new.status = $scope.statusList[0];

        $scope.eventsOptions = UserService.getAdmins();/*function(response){
            $scope.selected = response[0];
        });*/

        $scope.showModal = function() {
            $('#addNewAppModal').modal('show');
        }
        
        $scope.editModal = function(item, index) {
            $scope.selectedIndex = index;
            $scope.original = angular.copy(item);
            $scope.item = item;
            $('#EditModel').modal('show');
        }
        


        $scope.checkUsername = function() {
            console.log($scope.NewUsername);
            $scope.usernameAvailablity = ($scope.NewUsername=="Khaleel");
        }

        $scope.checkEmail = function() {
            console.log($scope.NewUsername);
            $scope.emailAvailablity = ($scope.newEmail=="Khaleel");
        }

        $scope.add = function(){

            if($scope.avatar.getAcceptedFiles().length > 0){
                var avatarcovers = angular.fromJson($scope.avatar.getAcceptedFiles()[0].xhr.response);
                if(avatarcovers.photo){
                    $scope.new.avatar = avatarcovers.photo;
                } 
            }


            
            console.log($scope.new);
            UserService.register($scope.new,function () {
                $scope.eventsOptions = UserService.getAdmins();
                $('#addNewAppModal').modal('hide');
                
                //Reset The From
                $scope.newAvatar.removeAllFiles();
                $scope.new = {};
                
            });
        }
        
        
        
        
        $scope.delete = function(item){
            console.log(item._id);
            UserService.remove({id: item._id},function (response) {
                
                var index = $scope.eventsOptions.indexOf(item);
                $scope.eventsOptions.splice(index, 1);
                
                if(!response._id){
                    $scope.eventsOptions = UserService.getAdmins();
                }
                
            });
        }

        $scope.reset = function(item){
            console.log(item._id);
            UserService.reset({id: item._id},function (response) {            
                
                if(!response._id){
                    $scope.eventsOptions = UserService.getAdmins();
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
            console.log($scope.item);
            UserService.update({id: $scope.item._id},$scope.item,function (response) {
                if(!response.ok){
                    $scope.eventsOptions = UserService.getAdmins();
                }
            })
            
            $scope.newAvatar.removeAllFiles();
        }    
        
        $scope.dzSuccess = function(file, xhr){
            console.log($scope.selectedIndex);
            $scope.item.avatar = xhr.photo;
            $scope.$apply();
        }


    }]);
