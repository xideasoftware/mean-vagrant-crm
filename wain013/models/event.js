const mongoose = require("mongoose");
const imageSchema = require("./image");
const optionsSchema = require("./option");
const socialMediaSchema = require("./socialMedia");
const ratingSchema = require("./rating");
const commentSchema = require("./comment");
const User = require("./user").User;
const Category = require("./eventCategory").EventCategory;
const Option = require("./eventOption").EventOption;
const validator = require("validator");

const STATUS = {
    PUBLISHED: "PUBLISHED",
    APPROVED: "APPROVED",
    PROVOKED: "PROVOKED",
    PENDING: "PENDING",
    ONHOLD: "ONHOLD",
    SUSPENDED: "SUSPENDED"
};

const eventSchema = new mongoose.Schema({
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
    description: {
        arabic: {
            type: String,
            required: false
        },
        english: {
            type: String,
            required: false
        }
    },
    host: {
        type: String,
        required: false
    },
    startDate: {
        type: Date,
        required: false
    },
    endDate: {
        type: Date,
        required: false
    },
    location: {
        latitude: {
            type: String,
            required: false
        },
        longitude: {
            type: String,
            required: false
        },
        city: {
            type: String,
            required: false
        }

    },
    phone: {
        type: Number,
        //TODO: validate
    },
    entranceFee: String,
    cover: imageSchema,
    socialMedias: [ socialMediaSchema ],
    attendants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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
    ratings: [ ratingSchema ],
    tags: [{
        type:String,
    }],
    editorPick: {
        type:Boolean,
        default: false
    },
    status: {
        type: String,
        enum: [ STATUS.PUBLISHED, STATUS.APPROVED, STATUS.PROVOKED, STATUS.PENDING, STATUS.ONHOLD , STATUS.SUSPENDED ],
        default: STATUS.PENDING,
    },
    comments: [ commentSchema ],
    photos: [ imageSchema ],
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "EventCategory",
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
        ref: "EventOption",
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
});


eventSchema.statics.createEvent = function (eventInfo) {
    return this.create(eventInfo);
};

eventSchema.methods.updateEvent = function (eventInfo) {
    return this.update(eventInfo, { runValidators: false });
};

eventSchema.methods.removeEvent = function () {
    return this.remove();
};

eventSchema.statics.getEvents = function () {
    return this.find().populate('categories').populate('options');
};

eventSchema.statics.getFilteredEvents = function (status) {
    return this.find({ status: status }).populate('categories').populate('options');
};

eventSchema.methods.addOption = function (optionInfo) {
    this.options.addToSet(optionInfo);
    return this.save();
};

eventSchema.methods.removeOption = function (optionId) {
    this.options.pull(optionId);
    return this.save();
};


eventSchema.methods.addSocialMedia = function (socialMediaInfo) {
    this.socialMedias.addToSet(socialMediaInfo);
    return this.save();
};

eventSchema.methods.removeSocialMedia = function (socialMediaId) {
    this.socialMedias.pull(socialMediaId);
    return this.save();
};


eventSchema.methods.addAttendant = function (attendantId) {
    this.attendants.addToSet(attendantId);
    return this.save()
};

eventSchema.methods.removeAttendant = function (attendantId) {
    this.attendants.pull(attendantId);
    return this.save();
};


eventSchema.methods.addRating = function (ratingInfo) {
    this.ratings.addToSet(ratingInfo);
    return this.save();
};

eventSchema.methods.removeRating = function (ratingId) {
    this.ratings.pull(ratingId);
    return this.save();
};


eventSchema.methods.addTag = function (tagInfo) {
    this.tags.addToSet(...tagInfo.tags);
    return this.save();
};

eventSchema.methods.removeTag = function (tag) {
    this.tags.pull(tag);
    return this.save();
};


eventSchema.methods.addComment = function (commentInfo) {
    this.comments.addToSet(commentInfo);
    return this.save();
};

eventSchema.methods.removeComment = function (commentId) {
    this.comments.pull(commentId);
    return this.save();
};


eventSchema.methods.addPhoto = function (photoInfo) {
    this.photos.addToSet(...photoInfo);
    return this.save();
};

eventSchema.methods.removePhoto = function (photoId) {
    this.photos.pull(photoId);
    return this.save();
};


eventSchema.methods.addCategory = function (categoryId) {
    this.categories.addToSet(categoryId);
    return this.save();
};

eventSchema.methods.removeCategory = function (categoryId) {
    this.categories.pull(categoryId);
    return this.save();
};


module.exports = {
    eventSchema: eventSchema,
    Event: mongoose.model("Event", eventSchema)
};

