var CollectionsService = function (API, $resource) {

    var CollectionsService = $resource( '/collection/:id', {id: '@id'}, {
        query: {
            method: 'GET',
            isArray: true,
            url: API.url + '/collections/'
        },
        get: {
            url: API.url + '/collection/:id',
            method: 'GET'
        },
        save: {
            url: API.url + '/collection',
            method: 'POST'
        },
        update: {
            method:'PUT'
        },
        remove: {
            method: 'DELETE'
        },
    });

    return CollectionsService;

};

module.exports = CollectionsService;

