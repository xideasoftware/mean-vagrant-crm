'use strict';

/* Controllers */

angular.module('wain013', ['ngSanitize', 'ui.select', 'summernote'])
    .controller('EmailTemplatesCtrl', ['$scope', 'SettingsService', 'UserService', 'ipCookie', '$rootScope', function($scope, SettingsService, UserService,ipCookie,$rootScope) {


    $scope.summernote_options = {
        height: 200,
        onfocus: function(e) {
            $('body').addClass('overlay-disabled');
        },
        onblur: function(e) {
            $('body').removeClass('overlay-disabled');
        },
        toolbar: [
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert',['ltr','rtl']],
            ['insert', ['link','picture', 'video', 'hr']],
            ['view', ['fullscreen', 'codeview']]
        ]
    }


    $scope.template = {};
    $scope.template.newUser = {};
    $scope.template.businessAccount = {};
    $scope.template.resetPassword = {};
    $scope.template.forgetPassword = {};
    $scope.template.addContent = {};
    $scope.template.approveContent = {};
    $scope.template.deleteContent = {};

    var tempEnglish = " Hello buddy [user], :D ";
    var tempArabic = " أهلا [user], :D ";

    $scope.template.newUser.english = tempEnglish;
    $scope.template.newUser.arabic = tempArabic;
    $scope.template.businessAccount.english = tempEnglish;
    $scope.template.businessAccount.arabic = tempArabic;
    $scope.template.resetPassword.english = tempEnglish;
    $scope.template.resetPassword.arabic = tempArabic;
    $scope.template.forgetPassword.english = tempEnglish;
    $scope.template.forgetPassword.arabic = tempArabic;
    $scope.template.addContent.english = tempEnglish;
    $scope.template.addContent.arabic = tempArabic;
    $scope.template.approveContent.english = tempEnglish;
    $scope.template.approveContent.arabic = tempArabic;
    $scope.template.deleteContent.english = tempEnglish;
    $scope.template.deleteContent.arabic = tempArabic;


    }]);

