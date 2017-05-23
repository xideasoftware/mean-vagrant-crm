const models = require("../models");
const router = require("express").Router();
const auth = require("../util/auth/index");
const passport = require("passport");


router.post("/", passport.authenticate("jwt", { session: false }),
    auth.can("Create Content"), (req, res, next) => {
    req.body.user = req.user;
    res.locals.promise = models.Content.createContent(req.body);
    return next();
});

router.put("/:contentId", passport.authenticate("jwt", { session: false }),
    auth.can("Update Content"), (req, res, next) => {
    res.locals.promise = req.params.content.updateContent(req.body);
    return next();
});

router.delete("/:contentId", passport.authenticate("jwt", { session: false }),
    auth.can("Remove Content"), (req, res, next) => {
    res.locals.promise = req.params.content.removeContent();
    return next();
});

router.get("/:contentId", (req, res, next) => {
    res.locals.promise = models.Content.getContent(req.params.contentId);
    return next();
});

router.get("/:status?", (req, res, next) => {
    if(req.query.status) {
        res.locals.promise = models.Content.getFilteredContents(req.query.status);
        return next();
    } else {
        res.locals.promise = models.Content.getContents();
        return next();
    }
});


router.post("/:contentId/publish", passport.authenticate("jwt", { session: false }),
    auth.can("Publish Content"), (req, res, next) => {
    res.locals.promise = req.params.content.publish();
    return next();
});


router.post("/:contentId/approve", passport.authenticate("jwt", { session: false }),
    auth.can("Approve Content"), (req, res, next) => {
    res.locals.promise = req.params.content.approve();
    return next();
});

router.post("/:contentId/hold", passport.authenticate("jwt", { session: false }),
    auth.can("Hold Content"), (req, res, next) => {
    res.locals.promise = req.params.content.hold();
    return next();
});

router.post("/:contentId/suspend", passport.authenticate("jwt", { session: false }),
    auth.can("Suspend Content"), (req, res, next) => {
    res.locals.promise = req.params.content.suspend();
    return next();
});

router.post("/:contentId/provoke", passport.authenticate("jwt", { session: false }),
    auth.can("Provoke Content"), (req, res, next) => {
    res.locals.promise = req.params.content.provoke();
    return next();
});




router.param("contentId", (req, res, next, contentId) => {
    models.Content.findById(contentId)
        .then(content => {
            if(!content) {
                return next(new Error("Content Does Not Exist"))
            } else {
                req.params.content = content;
                return next();
            }
        }, err => next(err) );
});


module.exports = router;
