/* ============================================================
 * Directive: pgHorizontalMenu
 * AngularJS directive for Pages Horizontal Menu
 * ============================================================ */

angular.module('wain013')
    .directive('pgHorizontalMenu', function($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                
                $(document).on('click', '.horizontal-menu .bar-inner > ul > li', function(){
                    $(this).toggleClass('open').siblings().removeClass('open');
                });
               
                $('.content').on('click', function () {
                    $('.horizontal-menu .bar-inner > ul > li').removeClass('open');
                });
            }
        }
    });
  
       
        
angular.module('wain013')
    .directive('pgHorizontalMenuToggle', function($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                
                $(element).click(function(e) {
                    e.preventDefault();
                    $('body').toggleClass('menu-opened');
                });

            }
        }
    });
  
       
        