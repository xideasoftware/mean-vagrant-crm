var BusinessService = function (API, $resource) {
    
    var BusinessService = $resource(API.url + '/business/:id', {id: '@id', photoId: '@photoId', socialId: '@socialId' , branchId: '@branchId', optionId: '@optionId', reviewId: '@reviewId',
                                    ratingId: '@ratingId', commentId: '@commentId', categoryId: '@categoryId', collectionId: '@collectionId', tag: '@tag'}, {
        get: {
            method: 'GET',
        },
        query: {
            method: 'GET',
            isArray: true,
            url: API.url + '/businesses/'
        },
        save: {
            headers: {'Content-Type': undefined},
            url: API.url + '/businesses/',
            method: 'POST'
        },
        update: {
            url: API.url + '/business/:id',
            method:'PUT'
        },
        remove: {
            url: API.url + '/business/:id',
            method:'DELETE'
        },
        addPhotos: {
            headers: {'Content-Type': undefined},
            url: API.url + '/business/:id/photo',
            method: 'POST'
        },
        removePhoto: {
            headers: {'Content-Type': undefined},
            url: API.url + '/business/:id/photo/:photoId',
            method: 'DELETE'
        },
        addSocialMedia: {
            headers: {'Content-Type': undefined},
            url: API.url + '/business/:id/socialMedia',
            method: 'POST'
        },
        removeSocialMedia: {
            headers: {'Content-Type': undefined},
            url: API.url + '/business/:id/socialMedia/:socialId',
            method: 'DELETE'
        },
        addTag: {
            headers: {'Content-Type': undefined},
            url: API.url + '/business/:id/tag',
            method: 'POST'
        },
        removeTag: {
            headers: {'Content-Type': undefined},
            url: API.url + '/business/:id/tag/:tag',
            method: 'DELETE'
        },
        addBranch: {
            headers: {'Content-Type': undefined},
            url: API.url + '/business/:id/branch',
            method: 'POST'
        },
        removeBranch: {
            headers: {'Content-Type': undefined},
            url: API.url + '/business/:id/branch/:branchId',
            method: 'DELETE'
        },
        addOption: {
            headers: {'Content-Type': undefined},
            url: API.url + '/business/:id/option',
            method: 'POST'
        },
        removeOption: {
            headers: {'Content-Type': undefined},
            url: API.url + '/business/:id/option/:optionId',
            method: 'DELETE'
        },
        addReview: {
            headers: {'Content-Type': undefined},
            url: API.url + '/business/:id/review',
            method: 'POST'
        },
        removeReview: {
            headers: {'Content-Type': undefined},
            url: API.url + '/business/:id/review/:reviewId',
            method: 'DELETE'
        },
        addComment: {
            headers: {'Content-Type': undefined},
            url: API.url + '/business/:id/review/:reviewId/comment',
            method: 'POST'
        },
        removeComment: {
            headers: {'Content-Type': undefined},
            url: API.url + '/business/:id/review/:reviewId/comment/:commentId',
            method: 'DELETE'
        },
        addRating: {
            headers: {'Content-Type': undefined},
            url: API.url + '/business/:id/rating',
            method: 'POST'
        },
        removeRating: {
            headers: {'Content-Type': undefined},
            url: API.url + '/business/:id/rating/:ratingId',
            method: 'DELETE'
        },
        addCategory: {
            headers: {'Content-Type': undefined},
            url: API.url + '/business/:id/category',
            method: 'POST'
        },
        removeCategory: {
            headers: {'Content-Type': undefined},
            url: API.url + '/business/:id/category/:categoryId',
            method: 'DELETE'
        },
        addCollection: {
            headers: {'Content-Type': undefined},
            url: API.url + '/business/:id/collection',
            method: 'POST'
        },
        removeCollection: {
            headers: {'Content-Type': undefined},
            url: API.url + '/business/:id/collection/:collectionId',
            method: 'DELETE'
        },
        
                    /******************** Options ****************/
        
        getBusinessesOptions: {
            url: API.url +  '/businessOption/',
            isArray: true,
            method: 'GET',
        },
        addBusinessesOption: {
            url: API.url +  '/businessOption/',
            method: 'POST'
        },
        removeBusinessesOption: {
            url: API.url +  '/businessOption/:optionId',
            method: 'DELETE'
        },
        updateBusinessesOption: {
            url: API.url +  '/businessOption/:optionId',
            method: 'PUT'
        },


        /******************** Options ****************/
        getBusinessesCategories: {
            url: API.url +  '/businessCategory/',
            isArray: true,
            method: 'GET',
        },
        addBusinessesCategory: {
            url: API.url +  '/businessCategory/',
            method: 'POST'
        },
        removeBusinessesCategory: {
            url: API.url +  '/businessCategory/:categoryId',
            method: 'DELETE'
        },
        updateBusinessesCategory: {
            url: API.url +  '/businessCategory/:categoryId',
            method: 'PUT'
        },
        remove: {
            method: 'DELETE',
            url: API.url + '/businesses/:id/'
        },

    });
    
    return BusinessService;
    
};

module.exports = BusinessService;
