const models = require("../models");
const auth = require("../util/auth/index");
const passport = require("passport");
const router = require("express").Router();

router.post("/", passport.authenticate("jwt", { session: false }),
    auth.can("Create Location"), (req, res, next) => {
    res.locals.promise = models.Location.createLocation(req.body);
    return next();
});

router.put("/:locationId", passport.authenticate("jwt", { session: false }),
    auth.can("Update Location"), (req, res, next) => {
    res.locals.promise = req.params.location.updateLocation(req.body);
    return next();
});

router.delete("/:locationId", passport.authenticate("jwt", { session: false }),
    auth.can("Delete Location"), (req, res, next) => {
    res.locals.promise = req.params.location.removeLocation();
    return next();
});

router.get("/:locationId", (req, res, next) => res.send(req.params.location) );

router.get("/", (req, res, next) => {
    res.locals.promise = models.Location.getLocations();
    return next();
});


router.param("locationId", (req, res, next, locationId) => {
    models.Location.findById(locationId)
        .then(location => {
            if(!location) {
                return next(new Error("Location Does Not Exist"));
            }  else {
                req.params.location = location;
                return next();
            }
        }, err => next(err) )
});


module.exports = router;
