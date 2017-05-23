const models = require("../models");
const auth = require("../util/auth/index");
const router = require("express").Router();
const passport = require("passport");


router.post("/", passport.authenticate("jwt", { session: false }),
    auth.can("Create SystemVariable"), (req, res, next) => {
        res.locals.promise = models.SystemVariable.createSystemVariable(req.body);
        return next();
});

router.get("/:group?", (req, res, next) => {
    if(req.query.group) {
        res.locals.promise = models.SystemVariable.getFilteredSystemVariables(req.query.group);
        return next();
    } else {
        res.locals.promise = models.SystemVariable.getSystemVariables();
        return next();
    }
});

router.get("/all", (req, res, next) => {
    res.locals.promise = models.SystemVariable.getAllSystemVariables();
    return next();
});


router.put("/:systemVariableId", passport.authenticate("jwt", { session: false }),
    auth.can("Update SystemVariable"), (req, res, next) => {
        res.locals.promise = req.params.systemVariable.updateSystemVariable(req.body);
        return next();
    });


router.post("/:systemVariableId/show", passport.authenticate("jwt", { session: false }),
    auth.can("Update SystemVariable"), (req, res, next) => {

        res.locals.promise = req.params.systemVariable.show();
        return next()
    });

router.post("/:systemVariableId/hide", passport.authenticate("jwt", { session: false }),
    auth.can("Update SystemVariable"), (req, res, next) => {

        res.locals.promise = req.params.systemVariable.hide();
        return next()
    });

router.delete("/:systemVariableId", passport.authenticate("jwt", { session: false }),
    auth.can("Delete SystemVariable"), (req, res, next) => {
        res.locals.promise = req.params.systemVariable.removeSystemVariable();
        return next();
    });

router.param("systemVariableId", (req, res, next, systemVariableId) => {
    models.SystemVariable.findById(systemVariableId)
        .then(systemVariable => {
            if(!systemVariable) {
                return next(new Error("SystemVariable Does Not Exist"));
            } else {
                req.params.systemVariable = systemVariable;
                return next();
            }
        }, err => next(err) )
});
module.exports = router;
