var LoginCtrl = function ($scope, $location,$rootScope, AuthService, $http) {
    
    // TEST
    $scope.login = {};
    $scope.login.email = $rootScope.email;
    $scope.login.password = $rootScope.password;

    
    // Auth
    AuthService.isAuthenticated(function () {
    
        $location.path('/dashboard');
    
    });


    // Login
    $scope.signin = function () {
        
        var credentials = {
            'email': $scope.email,
            'password': $scope.password
        }

        AuthService.login(credentials, function () {
            $location.path('/dashboard');
        }, function () {
           $scope.error = 'Please check the username and the password!';
        });
        
    }
};

module.exports = LoginCtrl;