const models = require("../models");
const auth = require("../util/auth/index");
const router = require("express").Router();
const passport = require("passport");


router.post("/", passport.authenticate("jwt", { session: false }),
    auth.can("Create Option"), (req, res, next) => {
        res.locals.promise = models.BusinessOption.createOption(req.body);
        return next();
});

router.get("/", (req, res, next) => {
    res.locals.promise = models.BusinessOption.getOptions();
    return next();
});

router.put("/:OptionId", passport.authenticate("jwt", { session: false }),
    auth.can("Update Option"), (req, res, next) => {
        res.locals.promise = req.params.Option.updateOption(req.body);
        return next();
    });

router.delete("/:OptionId", passport.authenticate("jwt", { session: false }),
    auth.can("Delete Option"), (req, res, next) => {
        res.locals.promise = req.params.Option.removeOption();
        return next();
    });

router.param("OptionId", (req, res, next, OptionId) => {
    models.BusinessOption.findById(OptionId)
        .then(Option => {
            if(!Option) {
                return next(new Error("Option Does Not Exist"));
            } else {
                req.params.Option = Option;
                return next();
            }
        }, err => next(err) )
});
module.exports = router;
