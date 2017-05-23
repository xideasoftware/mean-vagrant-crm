// ========== Dependencies ==========
require('angular');
require('angular-cookie')
require('angular-ui-router');
require('angular-resource');
require('angular-filter');
require('angular-ui-tinymce');
var ocLazyLoad = require('oclazyload');

// ========== Include Angular Controllers ==========
// Add any new controller here

var LoginCtrl                  = require('./controllers/LoginCtrl.js');
var RegisterCtrl               = require('./controllers/RegisterCtrl.js');
var DashboardCtrl              = require('./controllers/DashboardCtrl.js');
var NavCtrl                    = require('./controllers/NavCtrl.js');
var SettingsCtrl               = require('./controllers/SettingsCtrl.js');
var ArticlesListCtrl           = require('./controllers/articles/ArticlesListCtrl.js');
var ArticleCreateCtrl          = require('./controllers/articles/ArticleCreateCtrl.js');
var ShowArticleCtrl            = require('./controllers/articles/ShowArticleCtrl.js');
var BizAccountListCtrl         = require('./controllers/business-accounts/BizAccountListCtrl.js');
var BusinessListCtrl           = require('./controllers/businesses/BusinessListCtrl.js');
var BusinessCreateCtrl         = require('./controllers/businesses/BusinessCreateCtrl.js');
var BusinessesCategoriesCtrl   = require('./controllers/businesses/BusinessesCategoriesCtrl.js');
var BusinessOptionsCtrl        = require('./controllers/businesses/BusinessOptionsCtrl.js');
var ShowBusinessCtrl           = require('./controllers/businesses/ShowBusinessCtrl.js');
var EventsListCtrl             = require('./controllers/events/EventsListCtrl.js');
var ShowEventCtrl              = require('./controllers/events/ShowEventCtrl.js');
var EventsCategoriesCtrl       = require('./controllers/events/EventsCategoriesCtrl.js');
var EventsOptionsCtrl          = require('./controllers/events/EventsOptionsCtrl.js');
var EventCreateCtrl            = require('./controllers/events/EventCreateCtrl.js');
var EventsCalendarCtrl         = require('./controllers/events/EventsCalendarCtrl.js');
var UsersCreateCtrl            = require('./controllers/users/UsersCreateCtrl.js');
var SettingsTagsCtrl           = require('./controllers/settings/SettingsTagsCtrl.js');
var SettingsSystemVariablesCtrl= require('./controllers/settings/SettingsSystemVariablesCtrl.js');
var UsersListCtrl              = require('./controllers/users/UsersListCtrl.js');

// ========== Include Angular Services ==========
// Add any new service here

var ArticleService            = require('./services/ArticleService.js');
var AuthService               = require('./services/AuthService.js');
var BusinessService           = require('./services/BusinessService.js');
var CategoryService           = require('./services/CategoryService.js');
var CollectionsService        = require('./services/CollectionsService.js');
var EventsService             = require('./services/EventsService.js');
var LanguageService           = require('./services/LanguageService.js');
var LocationService           = require('./services/LocationService.js');
var UserService               = require('./services/UserService.js');
var SettingsService           = require('./services/SettingsService.js');
var ContentService            = require('./services/ContentService.js');

// ========== Include Angular Routers ==========
// Go to router.config.js to add any route
var Router                    = require('./router.config.js');


// ========== Angular Congfi      ==========
angular.module('wain013', ['ui.router', 'ui.utils', 'ipCookie', 'ngResource', 'angular.filter', 'ui.tinymce', 'oc.lazyLoad','iso.directives'])

.constant('API', {
    uploads_url:  'http://wain013.com/uploads/',
    url:  'http://wain013.com/api',
})

// ========== Angular Root Scope ==========
.run(function ($location, $rootScope, LanguageService) {

    var languages = LanguageService.query();
    $rootScope.languages = languages;
    

    // TEST
    $rootScope.email = 'admin@gmail.com';
    $rootScope.password = 'admin';
    $rootScope.username = 'admin@gmail.com';
    
    $rootScope.app = {
            name: 'Wain',
            description: 'Admin Dashboard Wain013',
            layout: {
                menuPin: false,
                menuBehind: false,
                theme: 'pages/css/pages.css'
            },
            author: 'Khaleel'
        }

})

    .directive('includeReplace', function() {
        return {
            require: 'ngInclude',
            restrict: 'A',
            link: function(scope, el, attrs) {
                el.replaceWith(el.children());
            }
        };
    })

// ========== Angular Services      ==========
// Add any new service here

.factory('ArticleService',          Arguments(ArticleService))
.factory('AuthService',             Arguments(AuthService))
.factory('BusinessService',         Arguments(BusinessService))
.factory('CategoryService',         Arguments(CategoryService))
.factory('CollectionsService',      Arguments(CollectionsService))
.factory('EventsService',           Arguments(EventsService))
.factory('LanguageService',         Arguments(LanguageService))
.factory('LocationService',         Arguments(LocationService))
.factory('UserService',             Arguments(UserService))
.factory('SettingsService',         Arguments(SettingsService))
.factory('ContentService',          Arguments(ContentService))

// ========== Third-Party Services      ==========


// ========== Angular Controllers   ==========
// Add any new controller here

.controller('LoginCtrl',                    Arguments(LoginCtrl))
.controller('RegisterCtrl',                 Arguments(RegisterCtrl))
.controller('NavCtrl',                      Arguments(NavCtrl))

.controller('DashboardCtrl',                Arguments(DashboardCtrl))
.controller('SettingsCtrl',                 Arguments(SettingsCtrl))

.controller('ArticlesListCtrl',             Arguments(ArticlesListCtrl))
.controller('ArticleCreateCtrl',            Arguments(ArticleCreateCtrl))
.controller('ShowArticleCtrl',              Arguments(ShowArticleCtrl))
.controller('BizAccountListCtrl',           Arguments(BizAccountListCtrl))
.controller('BusinessListCtrl',             Arguments(BusinessListCtrl))
.controller('BusinessesCategoriesCtrl',     Arguments(BusinessesCategoriesCtrl))
.controller('BusinessOptionsCtrl',     Arguments(BusinessOptionsCtrl))
.controller('ShowBusinessCtrl',             Arguments(ShowBusinessCtrl))
.controller('BusinessCreateCtrl',           Arguments(BusinessCreateCtrl))
.controller('EventCreateCtrl',              Arguments(EventCreateCtrl))
.controller('ShowEventCtrl',                Arguments(ShowEventCtrl))
.controller('EventsListCtrl',               Arguments(EventsListCtrl))
.controller('EventsCategoriesCtrl',         Arguments(EventsCategoriesCtrl))
.controller('EventsOptionsCtrl',            Arguments(EventsOptionsCtrl))
.controller('EventsCalendarCtrl',           Arguments(EventsCalendarCtrl))
.controller('UsersCreateCtrl',              Arguments(UsersCreateCtrl))
.controller('SettingsTagsCtrl',              Arguments(SettingsTagsCtrl))
.controller('SettingsSystemVariablesCtrl',              Arguments(SettingsSystemVariablesCtrl))
.controller('UsersListCtrl',                Arguments(UsersListCtrl))




    .directive('pgSidebar', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var $sidebar = $(element);
            	$sidebar.sidebar($sidebar.data());

            	// Bind events
                // Toggle sub menus
                $('body').on('click', '.sidebar-menu a', function(e) {

                    if ($(this).parent().children('.sub-menu') === false) {
                         return;
                     }
                     var el = $(this);
                     var parent = $(this).parent().parent();
                     var li = $(this).parent();
                     var sub = $(this).parent().children('.sub-menu');

                     if(li.hasClass("active open")){
                        el.children('.arrow').removeClass("active open");
                        sub.slideUp(200, function() {
                            li.removeClass("active open"); 
                        });
                        
                     }else{
                        parent.children('li.open').children('.sub-menu').slideUp(200);
                        parent.children('li.open').children('a').children('.arrow').removeClass('active open');
                        parent.children('li.open').removeClass("open active");
                        el.children('.arrow').addClass("active open");
                        sub.slideDown(200, function() {
                            li.addClass("active open");

                        });
                     }
                });

            }
        }
    })

    .directive('pgTab', ['$parse', function($parse) {
        return {
            link: function(scope, element, attrs) {
                var slide = attrs.slide;
                var onShown = $parse(attrs.onShown);
                // Sliding effect for tabs
                $(element).on('show.bs.tab', function(e) {
                    e = $(e.target).parent().find('a[data-toggle=tab]');

                    var hrefCurrent = e.attr('href');

                    if ($(hrefCurrent).is('.slide-left, .slide-right')) {
                        $(hrefCurrent).addClass('sliding');

                        setTimeout(function() {
                            $(hrefCurrent).removeClass('sliding');
                        }, 100);
                    }
                });

                $(element).on('shown.bs.tab', {
                    onShown: onShown
                }, function(e) {
                    if (e.data.onShown) {
                        e.data.onShown(scope);
                    }
                });

                $(element).click(function(e) {
                    e.preventDefault();
                    $(element).tab('show');
                });
            }
        };
    }])

.directive("owlCarousel", function() {
	return {
		restrict: 'E',
		transclude: false,
		link: function (scope) {
			scope.initCarousel = function(element) {
			  // provide any default options you want
				var defaultOptions = {
				};
				var customOptions = scope.$eval($(element).attr('data-options'));
				// combine the two options objects
				for(var key in customOptions) {
					defaultOptions[key] = customOptions[key];
				}
				// init carousel
				$(element).owlCarousel(defaultOptions);
			};
		}
	};
})
.directive('owlCarouselItem', [function() {
	return {
		restrict: 'A',
		transclude: false,
		link: function(scope, element) {
		  // wait for the last item in the ng-repeat then call init
			if(scope.$last) {
				scope.initCarousel(element.parent());
			}
		}
	};
}])


// ========== Angular Router Congfi ==========
.config(Arguments(Router));


angular.module('wain013')
.filter('rawHtml', ['$sce', function($sce){
  return function(val) {
    return $sce.trustAsHtml(val);
  };
}]);


angular.module('wain013')
.filter('image', ['$sce', "API", function($sce, API){
  return function(val) {
      if(val){
        return API.uploads_url + val;
      }else{
        return 'assets/img/gallery/default_user.jpg';
      }
  };
}]);


angular.module('wain013')
.filter('color', ['$sce', function($sce){
  return function(val) {
      console.log(val);
        switch(val) {
            case "ACTIVE":
                return "#8BC34A";
                break;
            case "PENDING":
                return "#03A9F4";
                break;
            case "BLOCKED":
                return "#000000";
                break;
            case "PUBLISHED":
                return "#8BC34A";
                break;
            case "APPROVED":
                return "#CDDC39";
                break;  
            case "PROVOKED":
                return "#FF9800";
                break;
            case "ONHOLD":
                return "#00BCD4";
                break;
            case "SUSPENDED":
                return "#F44336";
                break;
            case false:
                return "#FFFFFF";
                break;
            case true:
                return "#673AB7";
                break;
            default:
                return "#673AB7";
        }

  };
}]);


angular.module('wain013')
.filter('moment', function() {
    return function(dateString, format) {
        if (format === "fromNow"){
            return moment(dateString).fromNow();
        }else{
            return moment(dateString).format(format);
        }
    };
});


// Get Arguments names from required file
function Arguments(fn) {
    var dependencies = fn.toString().split(')', 1)[0].replace(/\s/g, '').substr(9).split(',');
    dependencies[dependencies.length] = fn;
    return dependencies;
}
