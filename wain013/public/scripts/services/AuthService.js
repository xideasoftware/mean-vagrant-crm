var AuthService = function (API, $http, ipCookie) {

    var authService = {

        isAuthenticated: function (success, error) {
            var token = ipCookie('JWT');
            
            // Check local token
            if (token == 'undefined' || token == null) {
                typeof(error) == "function" ? error() : null;
            } else {
                typeof(success) == "function" ? success() : null;
            }
        },

        login: function (credentials, success, error) {
            $http.post(API.url + '/user/login', credentials)
                .success(function (res) {
                    ipCookie('JWT', res);
                    typeof(success) == "function" ? success() : null;
                })
                .error(function (res) {
                    typeof(error) == "function" ? error() : null;
                });
        },

        register: function (credentials, success, error) {
            $http.post(API.url + '/signup', credentials)
                .success(function (res) {
                    typeof(success) == "function" ? success() : null;
                })
                .error(function (res) {
                    typeof(error) == "function" ? error() : null;
                })
        },

        logout: function (callback) {
            ipCookie.remove('JWT');
            typeof(callback) == "function" ? callback() : null;
        }

    };

    return authService;
};

module.exports = AuthService;