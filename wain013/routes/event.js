const models = require("../models");
const router = require("express").Router();
const auth = require("../util/auth/index");
const passport = require("passport");
const upload = require("../config/multer");

router.get("/", passport.authenticate("jwt", { session: false }), (req, res, next) => {
    res.locals.promise = models.Event.getEvents();
    return next();
});

router.post("/", passport.authenticate("jwt", { session: false }),
    auth.can("Create Event"), upload.single("cover"), (req, res, next) => {
        if(req.file) req.body.cover = { filename: req.file.filename };

        res.locals.promise = models.Event.createEvent(req.body);
        return next();
    });

router.put("/:eventId", passport.authenticate("jwt", { session: false }),
    auth.can("Update Event"), (req, res, next) => {
        if(req.file) req.body.cover = { path: req.file.path };

        res.locals.promise = req.params.event.updateEvent(req.body);
        return next();
    });

router.delete("/:eventId", passport.authenticate("jwt", { session: false }),
    auth.can("Remove Event"), (req, res, next) => {
        res.locals.promise = req.params.event.removeEvent();
        return next();
    });

router.get("/:eventId", (req, res, next) => res.send(req.params.event));

router.get("/:status?", (req, res, next) => {
    if(req.query.status) {
        res.locals.promise = models.Event.getFilteredEvents(req.query.status);
        return next();
    } else {
        res.locals.promise = models.Event.getEvents();
        return next();
    }
});



router.post("/:eventId/option", passport.authenticate("jwt", { session: false }),
    auth.can("Add Event Option"), (req, res, next) => {
        res.locals.promise = req.params.event.addOption(req.body);
        return next();
    });

router.delete("/:eventId/option/:optionId", passport.authenticate("jwt", { session: false }),
    auth.can("Delete Event Option"), (req, res, next) => {
        res.locals.promise = req.params.event.removeOption(req.params.optionId);
        return next();
    });


router.post("/:eventId/socialMedia", passport.authenticate("jwt", { session: false }),
    auth.can("Add Event Social Media"), (req, res, next) => {
        res.locals.promise = req.params.event.addSocialMedia(req.body);
        return next();
    });

router.delete("/:eventId/socialMedia/:socialMediaId", passport.authenticate("jwt", { session: false }),
    auth.can("Remove Event Social Media"), (req, res, next) => {
        res.locals.promise = req.params.event.removeSocialMedia(req.params.socialMediaId);
        return next();
    });


router.post("/:eventId/attendant", passport.authenticate("jwt", { session: false }),
    auth.can("Add Event Attendant"), (req, res, next) => {
        res.locals.promise = req.params.event.addAttendant(req.body.attendant);
        return next();
    });

router.delete("/:eventId/attendant/:attendantId", passport.authenticate("jwt", { session: false }),
    auth.can("Remove Event Attendant"), (req, res, next) => {
        res.locals.promise = req.params.event.removeAttendant(req.params.attendantId);
        return next();
    });


router.post("/:eventId/rating", passport.authenticate("jwt", { session: false }),
    auth.can("Add Event Rating"), (req, res, next) => {
        req.body._id = req.user;

        res.locals.promise = req.params.event.addRating(req.body);
        return next();
    });

router.delete("/:eventId/rating", passport.authenticate("jwt", { session: false }),
    auth.can("Remove Event Rating"), (req, res, next) => {
        res.locals.promise = req.params.event.removeRating(req.user);
        return next();
    });


router.post("/:eventId/tag", passport.authenticate("jwt", { session: false }),
    auth.can("Add Event Tag"), (req, res, next) => {
        res.locals.promise = req.params.event.addTag(req.body);
        return next();
    });

router.delete("/:eventId/tag/:tag", passport.authenticate("jwt", { session: false }),
    auth.can("Remove Event Tag"), (req, res, next) => {
        res.locals.promise = req.params.event.removeTag(req.params.tag);
        return next();
    });


router.post("/:eventId/comment", passport.authenticate("jwt", { session: false }),
    auth.can("Add Event Comment"), (req, res, next) => {
        req.body.user = req.user;

        res.locals.promise = req.params.event.addComment(req.body);
        return next();
    });

router.delete("/:eventId/comment/:commentId", passport.authenticate("jwt", { session: false }),
    auth.can("Remove Event Comment"), (req, res, next) => {
        res.locals.promise = req.params.event.removeComment(req.params.commentId);
        return next();
    });

//TODO: set limit of uploads
//TODO: check if you need simple check for req.files instead of try-catch
router.post("/:eventId/photo", passport.authenticate("jwt", { session: false }),
    auth.can("Add Event Photo"), upload.array("photo"), (req, res, next) => {
        try {
            res.locals.promise = req.params.event.addPhoto(req.files.map( photo => ({ filename: photo.filename }) ));
            return next();
        } catch(err) {
            return next(new Error("You Should Use Form-Data Encoding Only With This End Point"));
        }
    });

router.delete("/:eventId/photo/:photoId", passport.authenticate("jwt", { session: false }),
    auth.can("Remove Event Photo"), (req, res, next) => {
        res.locals.promise = req.params.event.removePhoto(req.params.photoId);
        return next();
    });


router.post("/:eventId/category", passport.authenticate("jwt", { session: false }),
    auth.can("Add Event Category"), (req, res, next) => {
        res.locals.promise = req.params.event.addCategory(req.body.category);
        return next();
    });

router.delete("/:eventId/category/:categoryId", passport.authenticate("jwt", { session: false }),
    auth.can("Remove Event Category"), (req, res, next) => {
        res.locals.promise = req.params.event.removeCategory(req.params.categoryId);
        return next();
    });


router.param("eventId", (req, res, next, eventId) => {
    models.Event.findById(eventId).populate('options')
        .then(event => {
            if(!event) {
                return next(new Error("Event Does Not Exist"));
            } else {
                req.params.event = event;
                return next();
            }
        }, err => next(err) )
});


module.exports = router;