var ContentService = function (API, $resource) {

    var ContentService = $resource( API.url + '/content/:id', {id: '@id'}, {
        query: {
            method: 'GET',
            isArray: true,
            url:  API.url +  '/contents/'
        },
        getPublished: {
            method: 'GET',
            isArray: true,
            url:  API.url +  '/content?status=PUBLISED'
        },
        getPending: {
            method: 'GET',
            isArray: true,
            url:  API.url +  '/content?status=PENDING/'
        },
        update: {
            url:  API.url +  '/content/:id',
            method:'PUT'
        },
        save: {
            url:  API.url +  '/content/',
            method: 'POST'
        },
        delete: {
            url:  API.url +  '/content/:id',
            method:'DELETE'
        }
    });

    return ContentService;

};

module.exports = ContentService;
