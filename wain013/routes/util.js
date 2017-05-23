const models = require("../models");
const router = require("express").Router();
const passport = require("passport");
const auth = require("../util/auth/index");
const jwtGenerator = require("../util/jwtGenerator");


router.get("/users", passport.authenticate("jwt", { session: false }), auth.can("List Users"), (req, res, next) => {
    res.locals.promise = models.User.getUsers();
    return next();
});

router.get("/admins", passport.authenticate("jwt", { session: false }), auth.can("GET Admin"), (req, res, next) => {
    res.locals.promise = models.User.getAdmins();
    return next();
});

router.get("/check/email/:email", (req, res, next) => {
    res.locals.promise = models.User.checkEmail(req.params.email);
    return next();
});

router.get("/check/username/:username", (req, res, next) => {
    res.locals.promise = models.User.checkUsername(req.params.username);
    return next();
});

module.exports = router;

