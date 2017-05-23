var EventsService = function (API, $resource) {
    
    var EventsService = $resource(API.url +  '/events/:id', {id: '@id', photoId: '@photoId', socialId: '@socialId' , optionId: '@optionId',
        ratingId: '@ratingId', commentId: '@commentId', categoryId: '@categoryId', attendantId: '@attendantId', tag: '@tag'}, {

            get: {
                method: 'GET'
            },
            query: {
                method: 'GET',
                isArray: true,
                url: API.url +  '/events/'
            },
            save: {
                url: API.url +  '/events/',
                method: 'POST'
            },
            update: {
                url: API.url +  '/event/:id',
                method:'PUT'
            },
            remove: {
                url: API.url +  '/event/:id',
                method:'DELETE'
            },
        
            /******************** Options ****************/
        
            getEventsOptions: {
                url: API.url +  '/eventOption/',
                isArray: true,
                method: 'GET',
            },
            addEventsOption: {
                url: API.url +  '/eventOption/',
                method: 'POST'
            },
            removeEventsOption: {
                url: API.url +  '/eventOption/:optionId',
                method: 'DELETE'
            },
            updateEventsOption: {
                url: API.url +  '/eventOption/:optionId',
                method: 'PUT'
            },
        
            
            /******************** Options ****************/
            getEventsCategories: {
                url: API.url +  '/eventCategory/',
                isArray: true,
                method: 'GET',
            },
            addEventsCategory: {
                url: API.url +  '/eventCategory/',
                method: 'POST'
            },
            removeEventsCategory: {
                url: API.url +  '/eventCategory/:categoryId',
                method: 'DELETE'
            },
            updateEventsCategory: {
                url: API.url +  '/eventCategory/:categoryId',
                method: 'PUT'
            },
        
            /******************** Comment ****************/
            addComment: {
                url: API.url +  '/event/:id/comment',
                method: 'POST'
            },
            removeComment: {
                url: API.url +  '/event/:id/comment/:commentId',
                method: 'DELETE'
            },
            remove: {
                method: 'DELETE',
                url: API.url + '/events/:id/'
            }

        });

    return EventsService;
    
};

module.exports = EventsService;