/* ============================================================
 * Directive: pgQuickview
 * AngularJS directive for Pages Overlay Search jQuery plugin
 * ============================================================ */

angular.module('wain013')
    .directive('pgQuickview', ['$parse', function($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var $quickview = $(element)
                $quickview.quickview($quickview.data())

            }
        }
    }]);