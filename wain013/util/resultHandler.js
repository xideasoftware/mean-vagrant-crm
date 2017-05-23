const _ = require("lodash");


const failureHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    } else if(err.__proto__.constructor.name == "MongooseError") {
        return res.status(400).send(err);
    } else {
        return res.status(400).send(err.message);
    }
};

const resultHandler = (req, res, next) => {
    if(!res.locals.promise) {
        return next();
    } else {
        res.locals.promise
            .then(result =>  {
                try {
                    return res.send(_.omit(result.toObject(), "password"));
                } catch(err) {
                    return res.send(result);
                }
            }, err => failureHandler(err, req, res, next))
            .catch(err => {
                //TODO: log
                throw(err)
            });
    }
};

module.exports = [ resultHandler, failureHandler ];