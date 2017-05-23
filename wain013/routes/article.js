const models = require("../models");
const router = require("express").Router();
const auth = require("../util/auth/index");
const passport = require("passport");
const upload = require("../config/multer");

router.get("/", passport.authenticate("jwt", { session: false }), (req, res, next) => {
    res.locals.promise = models.Article.getArticles();
    return next();
});

router.post("/", passport.authenticate("jwt", { session: false }),
    auth.can("Create Article"), (req, res, next) => {
    req.body.user = req.user;

    res.locals.promise = models.Article.createArticle(req.body);
    return next();
});

router.put("/:articleId", passport.authenticate("jwt", { session: false }),
    auth.can("Update Article"), (req, res, next) => {

    res.locals.promise = req.params.article.updateArticle(req.body);
    return next();
});

router.delete("/:articleId", passport.authenticate("jwt", { session: false }),
    auth.can("Remove Article"), (req, res, next) => {
    res.locals.promise = req.params.article.removeArticle();
    return next();
});

router.get("/:articleId", (req, res, next) => {
    res.locals.promise = models.Article.getArticle(req.params.articleId);
    return next();
});

router.get("/:status?", (req, res, next) => {
    if(req.query.status) {
        res.locals.promise = models.Article.getFilteredArticles(req.query.status);
        return next();
    } else {
        res.locals.promise = models.Article.getArticles();
        return next();
    }
});


router.post("/:articleId/comment", passport.authenticate("jwt", { session: false }),
    auth.can("Add Article Comment"), (req, res, next) => {
    req.body.user = req.user;

    res.locals.promise = req.params.article.addComment(req.body);
    return next()
});

router.delete("/:articleId/comment/:commentId", passport.authenticate("jwt", { session: false }),
    auth.can("Remove Article Comment"), (req, res, next) => {
    res.locals.promise = req.params.article.removeComment(req.params.commentId);
    return next();
});

//TODO: set a limit for the number of uploads
router.post("/:articleId/photo", passport.authenticate("jwt", { session: false }),
    auth.can("Add Article Photo"), upload.array("photo"), (req, res, next) => {
    try{
        res.locals.promise = req.params.article.addPhoto(req.files.map(photo => ({ filename: photo.filename }) ));
        return next();
    } catch(err) {
        return next(new Error("You Should Use Form-Data Encoding Only With This End Point"))
    }
});

router.delete("/:articleId/photo/:photoId", passport.authenticate("jwt", { session: false }),
    auth.can("Remove Article Photo"), (req, res, next) => {
    res.locals.promise = req.params.article.removePhoto(req.params.photoId);
    return next();
});


router.post("/:articleId/tag", passport.authenticate("jwt", { session: false }),
    auth.can("Add Article Tag"), (req, res, next) => {
    res.locals.promise = req.params.article.addTag(req.body);
    return next();
});

router.delete("/:articleId/tag/:tag", passport.authenticate("jwt", { session: false }),
    auth.can("Remove Article Tag"), (req, res, next) => {
    res.locals.promise = req.params.article.removeTag(req.params.tag);
    return next();
});


router.post("/:articleId/like", passport.authenticate("jwt", { session: false }),
    auth.can("Like Article"), (req, res, next) => {
    res.locals.promise = req.params.article.like(req.user);
    return next();
});

router.delete("/:articleId/like", passport.authenticate("jwt", { session: false }),
    auth.can("Unlike Article"), (req, res, next) => {
    res.locals.promise = req.params.article.unlike(req.user);
    return next();
});


router.put("/:articleId/publish", passport.authenticate("jwt", { session: false }),
    auth.can("Publish Article"), (req, res, next) => {
    res.locals.promise = req.params.article.publish();
    return next();
});


router.put("/:articleId/approve", passport.authenticate("jwt", { session: false }),
    auth.can("Approve Article"), (req, res, next) => {
    res.locals.promise = req.params.article.approve();
    return next();
});

router.put("/:articleId/hold", passport.authenticate("jwt", { session: false }),
    auth.can("Hold Article"), (req, res, next) => {
    res.locals.promise = req.params.article.hold();
    return next();
});

router.put("/:articleId/suspend", passport.authenticate("jwt", { session: false }),
    auth.can("Suspend Article"), (req, res, next) => {
    res.locals.promise = req.params.article.suspend();
    return next();
});

router.put("/:articleId/provoke", passport.authenticate("jwt", { session: false }),
    auth.can("Provoke Article"), (req, res, next) => {
    res.locals.promise = req.params.article.provoke();
    return next();
});


router.param("articleId", (req, res, next, articleId) => {
    models.Article.findById(articleId)
        .then(article => {
            if(!article) {
                return next(new Error("Article Does Not Exist"))
            } else {
                req.params.article = article;
                return next();
            }
        }, err => next(err) );
});

router.delete("/:articleId", passport.authenticate("jwt", { session: false }),
    auth.can("Remove Article"), (req, res, next) => {
    res.locals.promise = models.Article.findByIdAndRemove(req.params.articleId, function(err, article) {
    if (err) throw err;

        console.log('Article successfully deleted!');
    });
    return next();
  
});


module.exports = router;
