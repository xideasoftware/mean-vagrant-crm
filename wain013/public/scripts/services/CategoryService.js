var CategoryService = function (API, $resource) {

    var CategoryService = $resource( '/api/collection/:id', {id: '@id'}, {
        save: {
            url: '/api/collection',
            method: 'POST'
        }
    });

    return CategoryService;

};

module.exports = CategoryService;

