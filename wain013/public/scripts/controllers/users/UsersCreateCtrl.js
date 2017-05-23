var UsersCreateController = function ($ocLazyLoad, $scope, $location, UserService, LanguageService, LocationService) {
    console.log("UsersCreateController");

    var loggedinUser = UserService.getUser(function () {
        if (loggedinUser.__t != 'Admin'){
            $location.path('/notAllowed');
        }
    });

    var languages = LanguageService.query();
    $scope.languages = languages;

    var locations = LocationService.query();
    $scope.locations = locations;

    var status = ["PENDING", "ACTIVE", "BLOCKED"];
    $scope.status = status;

    $scope.addUser = function() {

        var $avatar = document.getElementById('avatar');
        var user = new FormData();

        user.append('language', $scope.language._id);
        user.append('username', $scope.user.username);
        user.append('firstName', $scope.user.firstName);
        user.append('lastName', $scope.user.lastName);
        user.append('password', $scope.user.password);
        user.append('email', $scope.user.email);
        user.append('birthDate', $scope.user.birthDate);
        user.append('location', $scope.selectedLocation);
        user.append('biography', $scope.user.biography);
        user.append('phone', $scope.user.phoneNumber);
        user.append('status', $scope.user.status);
        user.append('avatar', $avatar.files[0]);

        var newUser = UserService.postGeneralUser(user, function () {
            console.log(newUser)
            $location.path('/users');
        })
    };
    
    $scope.addBusinessUser = function() {

        var $avatar = document.getElementById('avatar');
        var user = new FormData();

        user.append('language', $scope.language._id);
        user.append('username', $scope.user.username);
        user.append('firstName', $scope.user.firstName);
        user.append('lastName', $scope.user.lastName);
        user.append('password', $scope.user.password);
        user.append('email', $scope.user.email);
        user.append('birthDate', $scope.user.birthDate);
        user.append('location', $scope.selectedLocation);
        user.append('biography', $scope.user.biography);
        user.append('phone', $scope.user.phoneNumber);
        user.append('status', $scope.user.status);
        user.append('avatar', $avatar.files[0]);

        var newUser = UserService.postBusinessUser(user, function () {
            console.log(newUser)
            $location.path('/users');
        })
    };

    

};
module.exports = UsersCreateController;