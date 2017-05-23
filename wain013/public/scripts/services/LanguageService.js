var LanguageService = function (API, $resource) {

    var LanguageService = $resource( API.url + '/language/:id', {id: '@id'}, {
        query: {
            method: 'GET',
            isArray: true,
            url: API.url + '/languages/'
        },
        get: {
            url: API.url + '/language/:id',
            method: 'GET'
        },
        save: {
            url: API.url + '/language',
            method: 'POST'
        },
        update: {
            method:'PUT'
        },
        remove: {
            method: 'DELETE'
        }
    });

    return LanguageService;

};

module.exports = LanguageService;
