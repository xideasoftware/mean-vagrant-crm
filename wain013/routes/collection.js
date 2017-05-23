const models = require("../models");
const auth = require("../util/auth/index");
const router = require("express").Router();
const passport = require("passport");



router.post("/", passport.authenticate("jwt", { session: false }),
    auth.can("Create Collection"), (req, res, next) => {
    res.locals.promise = models.Collection.createCollection(req.body);
    return next();
});

router.put("/:collectionId", passport.authenticate("jwt", { session: false }),
    auth.can("Update Collection"), (req, res, next) => {
    res.locals.promise = req.params.collection.updateCollection(req.body);
    return next();
});

router.delete("/:collectionId", passport.authenticate("jwt", { session: false }),
    auth.can("Remove Collection"), (req, res, next) => {
    res.locals.promise = req.params.collection.removeCollection();
    return next();
});

router.get("/:collectionId", (req, res, next) => res.send(req.params.collection) );

router.get("/", (req, res, next) => {
    res.locals.promise = models.Collection.getCollections();
    return next();
});


router.param("collectionId", (req, res, next, collectionId) => {
    models.Collection.findById(collectionId)
        .then( collection => {
            if(!collection) {
                return next(new Error("Collection Does Not Exist"));
            } else {
                req.params.collection = collection;
                return next();
            }
        }, err => next(err) )
});


module.exports = router;
