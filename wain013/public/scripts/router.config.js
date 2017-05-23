var Router = function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('root',                  {url: "/",                controller: '',                  templateUrl: "views/index.html",         abstract: false })
        .state('login',                 {url: "/login",           controller: 'LoginCtrl',         templateUrl: "views/login.html",         abstract: false })
        .state('register',              {url: "/register",        controller: 'RegisterCtrl',      templateUrl: "views/register.html",      abstract: false })

        // --------------------- Navigation Abstraction

        .state('nav',              {url: '',              templateUrl: "views/nav.html",              controller: 'NavCtrl',              abstract: true  })
        .state('app',              {url: '/app',              templateUrl: "views/app.html",              controller: 'NavCtrl',              abstract: true  })

        .state('nav.businessesList',                   {url: '/businesses/list',                   templateUrl: "views/businesses/business-list.html",          controller: 'BusinessListCtrl'})
        .state('nav.businessesPublished',              {url: '/businesses/published',              templateUrl: "views/businesses/business-list.html",          controller: 'BusinessListCtrl'})
        .state('nav.businessesPending',                {url: '/businesses/pending',                templateUrl: "views/businesses/business-pending.html",       controller: 'BusinessListCtrl'})
        .state('nav.businessesCategories',             {url: '/businesses/categories',             templateUrl: "views/businesses/business-categories.html",    controller: 'BusinessesCategoriesCtrl'})
        .state('nav.businessesOptions',                {url: '/businesses/options',              templateUrl: "views/businesses/business-options.html",       controller: 'BusinessOptionsCtrl'})
        .state('nav.businessesCreate',                 {url: '/business/create',                   templateUrl: "views/businesses/business-create.html",        controller: 'BusinessCreateCtrl'})
        .state('nav.businessesEdit',                   {url: '/businesses/edit:id',                templateUrl: "views/businesses/business-edit.html" ,         controller: 'BusinessListCtrl' })
        .state('nav.businessesShow',                   {url: '/businesses/show/:id',               templateUrl: "views/businesses/business-show.html" ,         controller: 'ShowBusinessCtrl' })
        .state('nav.businessesReviews',                {url: '/businesses/reviews',                templateUrl: "views/businesses/business-reviews.html" ,      controller: 'BusinessListCtrl' })
        .state('nav.businessesReview',                 {url: '/businesses/reviews/:id',            templateUrl: "views/businesses/business-review.html" ,       controller: 'ShowBusinessCtrl' })
        .state('nav.articlePublished',                 {url: '/articles/published',                templateUrl: 'views/articles/articles-published.html',       controller: 'ArticlesListCtrl' })
        .state('nav.articlePending',                   {url: '/articles/pending' ,                 templateUrl: 'views/articles/articles-pending.html',         controller: 'ArticlesListCtrl'})
        .state('nav.articleNew',                       {url: '/articles/new',                      templateUrl: 'views/articles/articles-create.html',          controller: 'ArticleCreateCtrl'})
        .state('nav.articleShow',                      {url: '/articles/show/:id',                 templateUrl: 'views/articles/article-show.html',             controller: 'ShowArticleCtrl'})
        .state('nav.eventShow',                        {url: '/events/show/:id',                   templateUrl: 'views/events/events-show.html',                controller: 'ShowEventCtrl'})
        .state('nav.eventsList',                       {url: '/events/list',                       templateUrl: 'views/events/events-list.html',                controller: 'EventsListCtrl'})
        .state('nav.eventsCalendar',                   {url: '/events/calendar',                   templateUrl: 'views/events/events-calendar.html',            controller: 'EventsCalendarCtrl'})
        .state('nav.eventsOptions',                 {url: '/events/options',                 templateUrl: 'views/events/events-options.html',          controller: 'EventsOptionsCtrl'})
        .state('nav.tags',                              {url: '/settings/tags',                     templateUrl: 'views/settings/settings-tags.html',         controller: 'SettingsTagsCtrl'})
        .state('nav.variables',                              {url: '/settings/variables',                     templateUrl: 'views/settings/settings-system-variables.html',         controller: 'SettingsTagsCtrl'})
        .state('nav.grid',                             {url: '/grid',                              templateUrl: 'views/grid.html'})
        .state('nav.settings',                         {url: '/settings',                              templateUrl: 'views/list.html'})
        .state('nav.list',                             {url: '/list',                              templateUrl: 'views/list.html'})
        .state('nav.notAllowed',                       {url: '/notAllowed',                        templateUrl: 'views/notAllowed.html'})
        // -------------------
        .state('nav.dashboard',                        {
            url: "/dashboard",                          
            controller: 'CMSCtrl',                                 
            templateUrl: "views/cms.html",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                                    'switchery',
                                    'select',
                                    'moment',
                                    'datepicker',
                                    'daterangepicker',
                                    'timepicker',
                                    'inputMask',
                                    'autonumeric',
                                    'wysihtml5',
                                    'summernote',
                                    'tagsInput',
                                    'dropzone',
                                    'typehead'
                                ], {
                            insertBefore: '#lazyload_placeholder'
                        })
                        .then(function () {
                            return $ocLazyLoad.load('scripts/controllers/CMSCtrl.js');
                        });
                        }]
            }
         })
        .state('nav.storyAll', {
            url: '/stories/all',
            templateUrl: 'views/articles/stories-all.html',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                                'switchery',
                                'select',
                                'moment',
                                'datepicker',
                                'daterangepicker',
                                'timepicker',
                                'inputMask',
                                'autonumeric',
                                'wysihtml5',
                                'summernote',
                                'tagsInput',
                                'dropzone',
                                'typehead'
                                ], {
                            insertBefore: '#lazyload_placeholder'
                        })
                        .then(function () {
                            return $ocLazyLoad.load('scripts/controllers/articles/ArticlesListCtrl.js');
                        });
                        }]
            }
        })
        .state('nav.storyPending', {
                url: '/stories/pending',
                templateUrl: 'views/articles/stories-pending.html',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                                    'switchery',
                                    'select',
                                    'moment',
                                    'datepicker',
                                    'daterangepicker',
                                    'timepicker',
                                    'inputMask',
                                    'autonumeric',
                                    'wysihtml5',
                                    'summernote',
                                    'tagsInput',
                                    'dropzone',
                                    'typehead'
                                    ], {
                                insertBefore: '#lazyload_placeholder'
                            })
                            .then(function () {
                                return $ocLazyLoad.load('scripts/controllers/articles/ArticlesPendingListCtrl.js');
                            });
                            }]
                }
            })
            .state('nav.storyPublished', {
                url: '/stories/published',
                templateUrl: 'views/articles/stories-published.html',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                                        'isotope',
                                        'codropsDialogFx',
                                        'metrojs',
                                        'owlCarousel',
                                        'noUiSlider'
                                    ], {
                                insertBefore: '#lazyload_placeholder'
                            })
                            .then(function () {
                                return $ocLazyLoad.load('scripts/controllers/articles/ArticlesPublishedListCtrl.js');
                            });
                            }]
                }
            })

        // Form elements/views/articles/articles-create.html
        .state('nav.storyNew', {
            url: '/stories/new',
            templateUrl: 'views/articles/stories-new.html',
            controller: 'NewStoryCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                                    'switchery',
                                    'select',
                                    'moment',
                                    'datepicker',
                                    'daterangepicker',
                                    'timepicker',
                                    'inputMask',
                                    'autonumeric',
                                    'wysihtml5',
                                    'summernote',
                                    'tagsInput',
                                    'dropzone',
                                    'typehead'
                                ], {
                            insertBefore: '#lazyload_placeholder'
                        })
                        .then(function () {
                            return $ocLazyLoad.load('scripts/controllers/articles/NewStoryCtrl.js');
                        });
                        }]
            }
        })
        .state('nav.settings', {
            url: '/settings',
            templateUrl: 'views/settings.html',
            controller: 'SettingsCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                                    'switchery',
                                    'select',
                                    'moment',
                                    'datepicker',
                                    'daterangepicker',
                                    'timepicker',
                                    'inputMask',
                                    'autonumeric',
                                    'wysihtml5',
                                    'summernote',
                                    'tagsInput',
                                    'dropzone',
                                    'typehead'
                                ], {
                            insertBefore: '#lazyload_placeholder'
                        })
                        .then(function () {
                            return $ocLazyLoad.load('scripts/controllers/SettingsCtrl.js');
                        });
                        }]
            }
        })
        .state('app.calendar', {
                    url: '/events/calendar',
                    templateUrl: 'views/events/events-calendar.html',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                    'switchery',
                                    'moment-locales',
                                    'interact',
                                    'dataTables'
                                ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function() {
                                    return $ocLazyLoad.load([
                                        'pages/js/pages.calendar.min.js',
                                        'scripts/controllers/events/CalendarCtrl.js'
                                    ])
                                });
                        }]
                    }
                })
        .state('nav.eventsPending', {
            url: '/events/pending',
            templateUrl: 'views/events/events-pending.html',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'switchery',
                        'select',
                        'moment',
                        'datepicker',
                        'daterangepicker',
                        'timepicker',
                        'inputMask',
                        'autonumeric',
                        'wysihtml5',
                        'summernote',
                        'tagsInput',
                        'dropzone',
                        'typehead'
                    ], {
                        insertBefore: '#lazyload_placeholder'
                    })
                        .then(function () {
                            return $ocLazyLoad.load('scripts/controllers/events/EventsPendingListCtrl.js');
                        });
                }]
            }
        })
        .state('nav.eventsAll', {
            url: '/events/all',
            templateUrl: 'views/events/events-all.html',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'switchery',
                        'select',
                        'moment',
                        'datepicker',
                        'daterangepicker',
                        'timepicker',
                        'inputMask',
                        'autonumeric',
                        'wysihtml5',
                        'summernote',
                        'tagsInput',
                        'dropzone',
                        'typehead'
                    ], {
                        insertBefore: '#lazyload_placeholder'
                    })
                        .then(function () {
                            return $ocLazyLoad.load('scripts/controllers/events/EventsListCtrl.js');
                        });
                }]
            }
        })
        .state('nav.eventsNew', {
            url: '/events/new',
            templateUrl: 'views/events/events-new.html',
            controller: 'NewEventCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                                    'switchery',
                                    'select',
                                    'moment',
                                    'datepicker',
                                    'daterangepicker',
                                    'timepicker',
                                    'datetimepicker',
                                    'inputMask',
                                    'autonumeric',
                                    'wysihtml5',
                                    'summernote',
                                    'tagsInput',
                                    'dropzone',
                                    'typehead'
                                ], {
                            insertBefore: '#lazyload_placeholder'
                        })
                        .then(function () {
                            return $ocLazyLoad.load('scripts/controllers/events/NewEventCtrl.js');
                        });
                        }]
            }
        })
        .state('nav.eventPublished', {
            url: '/events/published',
            templateUrl: 'views/events/events-published.html',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'isotope',
                        'codropsDialogFx',
                        'metrojs',
                        'owlCarousel',
                        'noUiSlider'
                    ], {
                        insertBefore: '#lazyload_placeholder'
                    })
                        .then(function () {
                            return $ocLazyLoad.load('scripts/controllers/events/EventsPublishedListCtrl.js');
                        });
                }]
            }
        })
        .state('nav.businessesNew', {
            url: '/businesses/new',
            templateUrl: 'views/businesses/business-new.html',
            controller: 'NewBusinessCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'switchery',
                        'select',
                        'moment',
                        'datepicker',
                        'daterangepicker',
                        'timepicker',
                        'datetimepicker',
                        'inputMask',
                        'autonumeric',
                        'wysihtml5',
                        'summernote',
                        'tagsInput',
                        'dropzone',
                        'typehead'
                    ], {
                        insertBefore: '#lazyload_placeholder'
                    })
                        .then(function () {
                            return $ocLazyLoad.load('scripts/controllers/businesses/NewBusinessCtrl.js');
                        });
                }]
            }
        })
        .state('nav.businessesAll', {
            url: '/businesses/all',
            templateUrl: 'views/businesses/business-all.html',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'switchery',
                        'select',
                        'moment',
                        'datepicker',
                        'daterangepicker',
                        'timepicker',
                        'inputMask',
                        'autonumeric',
                        'wysihtml5',
                        'summernote',
                        'tagsInput',
                        'dropzone',
                        'typehead'
                    ], {
                        insertBefore: '#lazyload_placeholder'
                    })
                        .then(function () {
                            return $ocLazyLoad.load('scripts/controllers/businesses/BusinessListCtrl.js');
                        });
                }]
            }
        })
        .state('nav.businessesPending', {
            url: '/businesses/pending',
            templateUrl: 'views/businesses/business-pending.html',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'switchery',
                        'select',
                        'moment',
                        'datepicker',
                        'daterangepicker',
                        'timepicker',
                        'inputMask',
                        'autonumeric',
                        'wysihtml5',
                        'summernote',
                        'tagsInput',
                        'dropzone',
                        'typehead'
                    ], {
                        insertBefore: '#lazyload_placeholder'
                    })
                        .then(function () {
                            return $ocLazyLoad.load('scripts/controllers/businesses/BusinessPendingListCtrl.js');
                        });
                }]
            }
        })
        .state('nav.businessesPublished', {
            url: '/businesses/published',
            templateUrl: 'views/businesses/business-published.html',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'isotope',
                        'codropsDialogFx',
                        'metrojs',
                        'owlCarousel',
                        'noUiSlider'
                    ], {
                        insertBefore: '#lazyload_placeholder'
                    })
                        .then(function () {
                            return $ocLazyLoad.load('scripts/controllers/businesses/BusinessPublishedListCtrl.js');
                        });
                }]
            }
        })
        .state('nav.eventsCategories', {
            url: '/events/categories',
            templateUrl: 'views/events/events-categories.html',
            controller: 'EventsCategoriesCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                                    'switchery',
                                    'select',
                                    'moment',
                                    'datepicker',
                                    'daterangepicker',
                                    'timepicker',
                                    'inputMask',
                                    'autonumeric',
                                    'wysihtml5',
                                    'summernote',
                                    'tagsInput',
                                    'dropzone',
                                    'typehead'
                                ], {
                            insertBefore: '#lazyload_placeholder'
                        })
                        .then(function () {
                            return $ocLazyLoad.load('scripts/controllers/events/EventsCategoriesCtrl.js');
                        });
                        }]
            }
        })
        .state('nav.businessesCategories', {
            url: '/businesses/categories',
            templateUrl: 'views/businesses/business-categories.html',
            controller: 'BusinessesCategoriesCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                                    'switchery',
                                    'select',
                                    'moment',
                                    'datepicker',
                                    'daterangepicker',
                                    'timepicker',
                                    'inputMask',
                                    'autonumeric',
                                    'wysihtml5',
                                    'summernote',
                                    'tagsInput',
                                    'dropzone',
                                    'typehead'
                                ], {
                            insertBefore: '#lazyload_placeholder'
                        })
                        .then(function () {
                            return $ocLazyLoad.load('scripts/controllers/businesses/BusinessesCategoriesCtrl.js');
                        });
                        }]
            }
        })

        .state('app.messages', {
            abstract: true,
            url: '/messages',
            templateUrl: 'views/messages/messages.html',
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'menuclipper',
                        'wysihtml5'
                    ], {
                        insertBefore: '#lazyload_placeholder'
                    })
                        .then(function() {
                            return $ocLazyLoad.load([
                                'scripts/controllers/messages/service.js',
                                'scripts/controllers/messages/message.js'
                            ])
                        });
                }]
            }
        })
        .state('app.messages.inbox', {
            url: '/inbox/:emailId',
            templateUrl: 'views/messages/email_inbox.html'
        })
        .state('app.messages.compose', {
            url: '/compose',
            templateUrl: 'views/messages/email_compose.html'
        })

        .state('nav.users', {
            url: '/users/all',
            templateUrl: 'views/users/users-all.html',
            controller: 'UsersListCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'switchery',
                        'select',
                        'moment',
                        'datepicker',
                        'daterangepicker',
                        'timepicker',
                        'inputMask',
                        'autonumeric',
                        'wysihtml5',
                        'summernote',
                        'tagsInput',
                        'dropzone',
                        'typehead'
                    ], {
                        insertBefore: '#lazyload_placeholder'
                    })
                        .then(function () {
                            return $ocLazyLoad.load('scripts/controllers/users/UsersListCtrl.js');
                        });
                }]
            }
        })

        .state('nav.usersBusiness', {
            url: '/users/business',
            templateUrl: 'views/users/users-business.html',
            controller: 'UsersListCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'switchery',
                        'select',
                        'moment',
                        'datepicker',
                        'daterangepicker',
                        'timepicker',
                        'inputMask',
                        'autonumeric',
                        'wysihtml5',
                        'summernote',
                        'tagsInput',
                        'dropzone',
                        'typehead'
                    ], {
                        insertBefore: '#lazyload_placeholder'
                    })
                        .then(function () {
                            return $ocLazyLoad.load('scripts/controllers/users/UsersListCtrl.js');
                        });
                }]
            }
        })

        .state('nav.usersAdmin', {
            url: '/users/admin',
            templateUrl: 'views/users/users-admin.html',
            controller: 'AdminUsersListCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'switchery',
                        'select',
                        'moment',
                        'datepicker',
                        'daterangepicker',
                        'timepicker',
                        'inputMask',
                        'autonumeric',
                        'wysihtml5',
                        'summernote',
                        'tagsInput',
                        'dropzone',
                        'typehead'
                    ], {
                        insertBefore: '#lazyload_placeholder'
                    })
                        .then(function () {
                            return $ocLazyLoad.load('scripts/controllers/users/AdminUsersListCtrl.js');
                        });
                }]
            }
        })
		.state('nav.contentPending', {
                url: '/contents/pending',
                templateUrl: 'views/contents/contents-pending.html',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'switchery',
                            'select',
                            'moment',
                            'datepicker',
                            'daterangepicker',
                            'timepicker',
                            'inputMask',
                            'autonumeric',
                            'wysihtml5',
                            'summernote',
                            'tagsInput',
                            'dropzone',
                            'typehead'
                                    ], {
                                insertBefore: '#lazyload_placeholder'
                            })
                            .then(function () {
                                return $ocLazyLoad.load('scripts/controllers/contents/ContentsPendingListCtrl.js');
                            });
                            }]
                }
            })
            .state('nav.contentPublished', {
                url: '/contents/published',
                templateUrl: 'views/contents/contents-published.html',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                                        'isotope',
                                        'codropsDialogFx',
                                        'metrojs',
                                        'owlCarousel',
                                        'noUiSlider'
                                    ], {
                                insertBefore: '#lazyload_placeholder'
                            })
                            .then(function () {
                                return $ocLazyLoad.load('scripts/controllers/contents/ContentsListCtrl.js');
                            });
                            }]
                }
            })

        // Form elements/views/articles/articles-create.html
        .state('nav.contentNew', {
            url: '/contents/new',
            templateUrl: 'views/contents/contents-new.html',
            controller: 'NewContentCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                                    'switchery',
                                    'select',
                                    'moment',
                                    'datepicker',
                                    'daterangepicker',
                                    'timepicker',
                                    'inputMask',
                                    'autonumeric',
                                    'wysihtml5',
                                    'summernote',
                                    'tagsInput',
                                    'dropzone',
                                    'typehead'
                                ], {
                            insertBefore: '#lazyload_placeholder'
                        })
                        .then(function () {
                            return $ocLazyLoad.load('scripts/controllers/contents/NewContentCtrl.js');
                        });
                        }]
            }
        })
        .state('nav.emailTemplates', {
            url: '/settings/email/templates',
            templateUrl: 'views/settings/settings-email-templates.html',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'switchery',
                        'select',
                        'moment',
                        'datepicker',
                        'daterangepicker',
                        'timepicker',
                        'inputMask',
                        'autonumeric',
                        'wysihtml5',
                        'summernote',
                        'tagsInput',
                        'dropzone',
                        'typehead'
                    ], {
                        insertBefore: '#lazyload_placeholder'
                    })
                        .then(function () {
                            return $ocLazyLoad.load('scripts/controllers/settings/EmailTemplatesCtrl.js');
                        });
                }]
            }
        })

};
module.exports = Router;