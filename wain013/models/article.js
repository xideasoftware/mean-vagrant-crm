const mongoose = require("mongoose");
const imageSchema = require("./image");
const commentSchema = require("./comment");
const User = require("./user").User;
const Language = require("./language").Language;


const STATUS = {
    PUBLISHED: "PUBLISHED",
    APPROVED: "APPROVED",
    PROVOKED: "PROVOKED",
    PENDING: "PENDING",
    ONHOLD: "ONHOLD",
    SUSPENDED: "SUSPENDED"
};

const articleSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
        validate: {
            validator: (userId, done) => {
                User.count({ _id: userId })
                    .then(count => {
                        return done(count)
                    }, err => {
                        //TODO: log
                        return done(false, err)
                    })
            },
            message: "User Does Not Exist"
        }
    },
    language: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Language",
        required: true,
        validate: {
            validator: (languageId, done) => {
                Language.count({ _id: languageId})
                    .then(count => {
                        return done(count);
                    }, err => {
                        //TODO: log
                        return done(false, err);
                    })
            },
            message: "Language Does Not Exist"
        }
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        unique: true,
        validate: {
            validator: (userId, done) => {
                User.count({ _id: userId })
                    .then(count => {
                        return done(count)
                    }, err => {
                        //TODO: log
                        return done(false, err)
                    })
            },
            message: "User Does Not Exist"
        }
    }],
    title: {
        type: String,
        required: false
    },
    body: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: [ STATUS.PUBLISHED, STATUS.APPROVED, STATUS.PROVOKED, STATUS.PENDING, STATUS.ONHOLD , STATUS.SUSPENDED ],
        default: STATUS.PENDING
    },
    tags: [ String ],
    editorPick: {
        type:Boolean,
        default: false
    },
    cover: imageSchema,
    photos: [ imageSchema ],
    comments: [ commentSchema ]
}, { timestamps: true });


articleSchema.statics.createArticle = function (articleInfo) {
    return this.create(articleInfo)
};

articleSchema.methods.updateArticle = function (articleInfo) {
    return this.update(articleInfo, { runValidators: true });
};

articleSchema.methods.removeArticle = function () {

    return this.remove();
};

articleSchema.statics.getArticles = function () {
    return this.find().populate('user').populate('language');
};

articleSchema.statics.getArticle = function (articleId) {
    return this.findById(articleId).populate('user').populate('language');
};

articleSchema.statics.getFilteredArticles = function (status) {
    return this.find({ status: status }).populate('user').populate('language');
};

articleSchema.methods.addComment = function (commentInfo) {
    this.comments.addToSet(commentInfo);
    return this.save();
};

articleSchema.methods.removeComment = function (commentId) {
    this.comments.pull(commentId);
    return this.save();
};

articleSchema.methods.addPhoto = function (photosInfo) {
    this.photos.addToSet(...photosInfo);
    return this.save();
};

articleSchema.methods.removePhoto = function (photoId) {
    this.photos.pull(photoId);
    return this.save();
};


articleSchema.methods.addTag = function (tagInfo) {
    this.tags.addToSet(...tagInfo.tags);
    return this.save();
};

articleSchema.methods.removeTag = function (tag) {
    this.tags.pull(tag);
    return this.save();
};

articleSchema.methods.like = function (userId) {
    this.likes.addToSet(userId);
    return this.save();
};

articleSchema.methods.unlike = function (userId) {
    this.likes.pull(userId);
    return this.save();
};


articleSchema.methods.publish = function () {
    this.status = STATUS.PUBLISHED;
    return this.save();
};


articleSchema.methods.approve = function () {
    this.status = STATUS.APPROVED;
    return this.save();
};

articleSchema.methods.hold = function () {
    this.status = STATUS.ONHOLD;
    return this.save();
};

articleSchema.methods.suspend = function () {
    this.status = STATUS.SUSPENDED;
    return this.save();
};

articleSchema.methods.provoke = function () {
    this.status = STATUS.PROVOKED;
    return this.save()
};


module.exports = {
    articleSchema: articleSchema,
    Article: mongoose.model("Article", articleSchema)
};