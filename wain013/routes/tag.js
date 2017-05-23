const models = require("../models");
const auth = require("../util/auth/index");
const router = require("express").Router();
const passport = require("passport");


router.post("/", passport.authenticate("jwt", { session: false }),
    auth.can("Create Tag"), (req, res, next) => {
        res.locals.promise = models.Tag.createTag(req.body);
        return next();
});

router.get("/", (req, res, next) => {
    res.locals.promise = models.Tag.getTags();
    return next();
});

router.put("/:tagId", passport.authenticate("jwt", { session: false }),
    auth.can("Update Tag"), (req, res, next) => {
        res.locals.promise = req.params.tag.updateTag(req.body);
        return next();
    });

router.delete("/:tagId", passport.authenticate("jwt", { session: false }),
    auth.can("Delete Tag"), (req, res, next) => {
        res.locals.promise = req.params.tag.removeTag();
        return next();
    });

router.param("tagId", (req, res, next, tagId) => {
    models.Tag.findById(tagId)
        .then(tag => {
            if(!tag) {
                return next(new Error("Tag Does Not Exist"));
            } else {
                req.params.tag = tag;
                return next();
            }
        }, err => next(err) )
});
module.exports = router;
