var LocationService = function ($resource) {

    var LocationService = $resource( '/api/locations/:id', {id: '@id'}, {
        query: {
            method: 'GET',
            isArray: true,
            url: '/api/locations/'
        },
        get: {
            url: '/api/location/:id',
            method: 'GET'
        },
        save: {
            url: '/api/location',
            method: 'POST'
        },
        update: {
            method:'PUT'
        },
        remove: {
            method: 'DELETE'
        }
    });

    return LocationService;

};

module.exports = LocationService;
