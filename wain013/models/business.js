const mongoose = require("mongoose");
const imageSchema = require("./image");
const User = require("./user").User;
const socialMediaSchema = require("./socialMedia");
const branchSchema = require("./branch");
const reviewSchema = require("./review");
const ratingSchema = require("./rating");
const Category = require("./businessCategory").BusinessCategory;
const Option = require("./businessOption").BusinessOption;
const Collection = require("./collection").Collection;
const validator = require("validator");


const STATUS = {
    PUBLISHED: "PUBLISHED",
    APPROVED: "APPROVED",
    PROVOKED: "PROVOKED",
    PENDING: "PENDING",
    ONHOLD: "ONHOLD",
    SUSPENDED: "SUSPENDED"
};

const businessSchema = new mongoose.Schema({
    owner: {
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
    title: {
        arabic: {
            type: String,
            required: false
        },
        english: {
            type: String,
            required: false
        }
    },
    logo: imageSchema,
    cover: imageSchema,
    description: {
        arabic: String,
        english: String
    },
    website: {
        type: String,
        validate: {
            validator: website => {
                return validator.isURL(website);
            },
            message: "Must Be a Valid URL"
        }
    },
    socialMedias: [ socialMediaSchema ],
    photos: [ imageSchema ],
    ownershipDocument: [ imageSchema ],
    tags: [{
        type:String,
    }],
    editorPick: {
        type:Boolean,
        default: false
    },
    isSponsored: {
        type:Boolean,
        default: false
    },
    branches: [ branchSchema ],
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "BusinessCategory",
        validate: {
            validator: (categoryId, callback) => {
                Category.count({ _id: categoryId})
                    .then(count => {
                        return callback(count);
                    }, err => {
                        //TODO: log
                        return callback(0, err);
                    })
            },
            message: "Category Does Not Exist"
        }
    }],
    options: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "BusinessOption",
        validate: {
            validator: (optionId, callback) => {
                Option.count({ _id: optionId})
                    .then(count => {
                        return callback(count);
                    }, err => {
                        //TODO: log
                        return callback(0, err);
                    })
            },
            message: "Option Does Not Exist"
        }
    }],
    reviews: [ reviewSchema ],
    status: {
        type: String,
        enum: [ STATUS.PUBLISHED, STATUS.APPROVED, STATUS.PROVOKED, STATUS.PENDING, STATUS.ONHOLD , STATUS.SUSPENDED ],
        default: STATUS.PENDING
    },
    ratings: [ ratingSchema ],
    collections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection",
        validate: {
            validator: (collectionId, done) => {
                Collection.count({ _id: collectionId })
                    .then( count => done(count) , err => done(false, err) )
            },
            message: "Collection Does Not Exist"
        }
    }]
});


businessSchema.statics.createBusiness = function (businessInfo) {
    return this.create(businessInfo);
};

businessSchema.statics.getBusinesses = function () {
    return this.find().populate('reviews').populate('categories').populate('options');
};

businessSchema.statics.getFilteredBusinesses = function (status) {
    console.log(status);
    return this.find({ status: status }).populate('reviews').populate('categories').populate('options');
};

businessSchema.statics.searchBusinesses = function (searchInfo) {
    return this.find();
};

businessSchema.methods.updateBusiness = function (businessInfo) {
    return this.update(businessInfo, { runValidators: false });
};

businessSchema.methods.removeBusiness = function () {
    return this.remove()
};


businessSchema.methods.addSocialMedia = function (socialMediaInfo) {
    this.socialMedias.addToSet(socialMediaInfo);
    return this.save();
};

businessSchema.methods.removeSocialMedia = function (socialMediaId) {
    this.socialMedias.pull(socialMediaId);
    return this.save();
};


businessSchema.methods.addPhoto = function (photoInfo) {
    this.photos.addToSet(...photoInfo);
    return this.save();
};

businessSchema.methods.removePhoto = function (photoId) {
    this.photos.pull(photoId);
    return this.save();
};


businessSchema.methods.addTag = function (tagInfo) {
    this.tags.addToSet(...tagInfo.tags);
    return this.save();
};

businessSchema.methods.removeTag = function (tag) {
    this.tags.pull(tag);
    return this.save();
};


businessSchema.methods.addBranch = function (branchInfo) {
    this.branches.addToSet(branchInfo);
    return this.save();
};

businessSchema.methods.removeBranch = function (branchId) {
    this.branches.pull(branchId);
    return this.save();
};


businessSchema.methods.addCategory = function (categoryId) {
    this.categories.addToSet(categoryId);
    return this.save();
};

businessSchema.methods.removeCategory = function (categoryId) {
    this.categories.pull(categoryId);
    return this.save();
};


businessSchema.methods.addOption = function (optionInfo) {
    this.options.addToSet(optionInfo);
    return this.save();
};

businessSchema.methods.removeOption = function (optionId) {
    this.options.pull(optionId);
    return this.save();
};


businessSchema.methods.addReview = function (reviewInfo) {
    this.reviews.addToSet(reviewInfo);
    return this.save();
};

businessSchema.methods.removeReview = function (reviewId) {
    this.reviews.pull(reviewId);
    return this.save();
};

businessSchema.methods.addCommentToReview = function (reviewId, commentInfo) {
    this.reviews.id(reviewId).addComment(commentInfo);
    return this.save();
};

businessSchema.methods.removeCommentFromReview = function (reviewId, commentId) {
    this.reviews.id(reviewId).removeComment(commentId);
    return this.save();
};


businessSchema.methods.addRating = function (ratingInfo) {
    this.ratings.addToSet(ratingInfo);
    return this.save();
};

businessSchema.methods.removeRating = function (ratingId) {
    this.ratings.pull(ratingId);
    return this.save();
};


businessSchema.methods.addCollection = function (collectionInfo) {
    this.collections.addToSet(...collectionInfo);
    return this.save();
};

businessSchema.methods.removeCollection = function (collectionId) {
    this.collections.pull(collectionId);
    return this.save();
};


module.exports = {
    businessSchema: businessSchema,
    Business: mongoose.model("Business", businessSchema)
};