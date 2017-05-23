var UserService = function (API, $resource) {
    
    var UserService = $resource(API.url + '/user/:id', {id: '@id'}, {
        query: {
            method: 'GET',
            isArray: true,
            url: API.url + '/users/'
        },
        getAdmins: {
            method: 'GET',
            isArray: true,
            url: API.url + '/admins/'
        },
        get: {
            url: API.url + '/user/:id',
            method: 'GET'
        },
        getUser: {
            url: API.url + '/user',
            method: 'GET'
        },
        register: {
            url: API.url + '/user/',
            method: 'POST'
        },
        postBusinessUser: {
            headers: {'Content-Type': undefined},
            url: API.url + '/businessUser',
            method: 'POST'
        },
        activate: {
            headers: {'Content-Type': undefined},
            url: API.url + '/user/:id/activate',
            method: 'PATCH'
        },
        block: {
            headers: {'Content-Type': undefined},
            url: API.url + '/user/:id/block',
            method: 'PATCH'
        },
        hold: {
            headers: {'Content-Type': undefined},
            url: API.url + '/user/:id/hold',
            method: 'PATCH'
        },
        getGeneralUsers: {
            method: 'GET',
            isArray: true,
            url: API.url + '/articles?status=PENDING/'
        },
        remove: {
            method: 'DELETE'
        },
        update: {
            method: 'PUT'
        },
        reset: {
            url: API.url + '/user/:id/reset',
            method: 'PUT'
        },
        postFavorite: {
            url: API.url + '/user/favorite/:id',
            method: 'POST'
        },
        deleteFavorite: {
            url: API.url + '/user/favorite/:id',
            method: 'DELETE'
        },
        postTags: {
            url: API.url + '/user/tag/:id',
            method: 'POST'
        },                
        deleteTags: {
            url: API.url + '/user/tag/:id',
            method: 'DELETE'
        },        
    });
    /*var User = $resource(API_HOST.getUrl() + API.url + '/v1/user/:id', {id: '@id'});
    return User;*/
    return UserService;
    
}

module.exports = UserService;