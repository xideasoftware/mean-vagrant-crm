const mongoose = require("mongoose");
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

const contentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
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

    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: [ STATUS.PUBLISHED, STATUS.APPROVED, STATUS.PROVOKED, STATUS.PENDING, STATUS.ONHOLD , STATUS.SUSPENDED ],
        default: STATUS.PENDING
    },
    

}, { timestamps: true });


contentSchema.statics.createContent = function (contentInfo) {
    return this.create(contentInfo)
};

contentSchema.methods.updateContent = function (contentInfo) {
    return this.update(contentInfo, { runValidators: true });
};

contentSchema.methods.removeContent = function () {
    return this.remove();
};

contentSchema.statics.getContents = function () {
    return this.find().populate('user').populate('language');
};

contentSchema.statics.getContent = function (contentId) {
    return this.findById(contentId).populate('user').populate('language');
};

contentSchema.statics.getFilteredContents = function (status) {
    return this.find({ status: status }).populate('user').populate('language');
};


contentSchema.methods.publish = function () {
    this.status = STATUS.PUBLISHED;
    return this.save();
};


contentSchema.methods.approve = function () {
    this.status = STATUS.APPROVED;
    return this.save();
};

contentSchema.methods.hold = function () {
    this.status = STATUS.ONHOLD;
    return this.save();
};

contentSchema.methods.suspend = function () {
    this.status = STATUS.SUSPENDED;
    return this.save();
};

contentSchema.methods.provoke = function () {
    this.status = STATUS.PROVOKED;
    return this.save()
};


module.exports = {
    contentSchema: contentSchema,
    Content: mongoose.model("Content", contentSchema)
};