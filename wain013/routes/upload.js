const models = require("../models");
const auth = require("../util/auth/index");
const router = require("express").Router();
const passport = require("passport");
const upload = require("../config/multer");


router.post("/", upload.single("photo"), passport.authenticate("jwt", { session: false }), auth.can("Upload Photo"), (req, res, next) => {

    if(req.file) req.body.photo = { filename: req.file.filename };
    res.locals.promise = models.Upload.upload(req.body);
    return next();
});



router.get("/", (req, res, next) => {
    res.locals.promise = models.Upload.getUploads();
    return next();
});

module.exports = router;
