var NavCtrl = function ($scope, $location, $http, ipCookie, AuthService, UserService) {


    // Check if user is loged in
    AuthService.isAuthenticated(
        function() {
            // INIT

            $http.defaults.headers.common.Authorization = 'JWT ' + ipCookie('JWT');

            init();
        }
        ,function () {
            $location.path('/login');

        });
    
    // Logout
    $scope.logout = function () {
        console.log("Bye Bye!");
        AuthService.logout(function () {
            $location.path('/login');
        });
        
    }
    
    function init () {
        
        // Link side nav with window URL
        $scope.isActive = function (path) {
            if(path instanceof Array){
                var isAct = false;
                for(var i=0;i<path.length;i++){
                    if($location.path().indexOf(path[i]) > -1 ){
                        isAct = true;
                    }
                }
                return isAct;
            }else{
              return $location.path().indexOf(path) > -1  
            }
            
        
        };

    }
    
    /* ----------------------- DOM Manipulation ----------------------- */
    
    var Sidemenu = function() {
        this.$body = $("body"),
        this.$menuItem = $("#sidebar-menu a")
    };
    
    var openLeftBar = function() {
        
        $("#wrapper").toggleClass("enlarged");
        $("#wrapper").addClass("forced");

        if($("#wrapper").hasClass("enlarged") && $("body").hasClass("fixed-left")) {
            $("body").removeClass("fixed-left").addClass("fixed-left-void");
        } else if(!$("#wrapper").hasClass("enlarged") && $("body").hasClass("fixed-left-void")) {
            $("body").removeClass("fixed-left-void").addClass("fixed-left");
        }

        if($("#wrapper").hasClass("enlarged")) {
            $(".left ul").removeAttr("style");
        } else {
            $(".subdrop").siblings("ul:first").show();
        }
        
        $("body").trigger("resize");
    }
    
    var $openLeftBtn = $(".open-left");
    
    $openLeftBtn.on('click', function(e) {
        e.stopPropagation();
        openLeftBar();
    });
    
};

module.exports = NavCtrl;