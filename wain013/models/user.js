const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const imageSchema = require("./image");
const User = require("./user").User;
const Language = require("./language").Language;
const emailHandler = require("../util/emailHandler");
const serverEmails = require("../res/serverEmails");
const emailResetTemplate = require("../res/emailTemplates").emailResetTemplate;


const STATUS = {
    ACTIVE: "ACTIVE",
    PENDING: "PENDING",
    BLOCKED: "BLOCKED"
};

const USER = {
    ADMIN: "Admin",
    BUSINESSUSER: "Business User",
    USER: "User"
};


const userSchema = new mongoose.Schema({
    subscription: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        enum: [ USER.ADMIN, USER.BUSINESSUSER, USER.USER ],
        default: USER.USER
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (email) => {
                return validator.isEmail(email);
            }
        }
    },
    password: {
        type: String,
        required: true,
        unique: false,
        select: false
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    avatar: imageSchema,
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
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
        validate: {
            validator: (locationId, done) => {
                Location.count({ _id: locationId })
                //TODO: Log
                    .then(count => done(count), err => done(false, err) )
            }
        }
    },
    biography: String,
    phone: String,
    status: {
        type: String,
        enum: [ STATUS.ACTIVE, STATUS.PENDING, STATUS.BLOCKED ],
        default: STATUS.PENDING
    }
});


userSchema.statics.createUser = function (userInfo, callback)  {
    hashPassword(userInfo, (err) => {
        if(err) {
            return callback(err, null);
        } else {

            return callback(null, this.create(userInfo));
        }
    })
};

userSchema.methods.updateUser = function (userInfo, callback) {
    hashPassword(userInfo, (err) => {
        if(err) {
            return callback(err, null);
        } else {
            return callback(null, this.update(userInfo));
        }
    })
};

userSchema.methods.resetUserPass = function (userInfo, callback) {
    userInfo.password = Math.floor((Math.random() * 100000));
    var content = "Your password was reset to " + userInfo.password; 
    hashPassword(userInfo, (err) => {
        if(err) {
            return callback(err, null);
        } else {
            emailHandler.sendEmail(serverEmails.khaleel, userInfo.email, emailResetTemplate.title, content, emailResetTemplate.id);                
            return callback(null, this.update(userInfo));
        }
    })
};

userSchema.methods.removeUser = function () {
    return this.remove();
};

userSchema.statics.getUsers = function () {
    return this.find().where("userType").ne("Admin").populate('bookmarks').populate('language');
};

userSchema.statics.getAdmins = function () {
    return this.find().where("userType").equals("Admin").populate('bookmarks').populate('language');
};

userSchema.statics.getUser = function (userId) {
    return this.findById(userId).populate('bookmarks').populate('language');
};

userSchema.statics.checkEmail = function (email) {
    //todo return custom message
    passport.use(new LocalStrategy({ usernameField: "email", passwordField: "password" }, (email, password, done) => {
    this.findOne({ email: email }).select("+password")
        .then( (user) => {
            if (!user) {
                return done(null, false);
            } else {
                bcrypt.compare(password, user.password, (err, res) => {
                    if (err) { return done(err); }
                    if(res) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                });
            }
        }, (err) => {
            return done(err);
        });
}));

};

userSchema.statics.checkUsername = function (username) {
    //todo return custom message
    return this.findOne({username:username});

};

userSchema.methods.activate = function () {
    return this.update({ status: STATUS.ACTIVE })
};

userSchema.methods.hold = function () {
    return this.update({ status: STATUS.PENDING })
};

userSchema.methods.block = function () {
    return this.update({ status: STATUS.BLOCKED })
};

userSchema.methods.addBookmark = function (articleId) {
    this.bookmarks.addToSet(articleId);
    return this.save();
};

userSchema.methods.removeBookmark = function (articleId) {
    this.bookmarks.pull(articleId);
    return this.save();
};

userSchema.methods.addTag = function (tagId) {
    this.tags.addToSet(tagId);
    return this.save();
};

userSchema.methods.removeTag = function (tagId) {
    this.tags.pull(tagId);
    return this.save();
};

userSchema.methods.addFavorite = function (favoriteId) {
    this.favorites.addToSet(favoriteId);
    return this.save();
};

userSchema.methods.removeFavorite = function (favoriteId) {
    this.favorites.pull(favoriteId);
    return this.save();
};

userSchema.methods.addAttend = function (attendId) {
    this.attends.addToSet(attendId);
    return this.save();
};

userSchema.methods.removeAttend = function (attendId) {
    this.attends.pull(attendId);
    return this.save();
};

const hashPassword = (userInfo, callback) => {
    if(!userInfo.password) {
        return callback();
    } else {
        bcrypt.hash(userInfo.password, 10, (err, hashedPassword) => {
            if(err) {
                return callback(err);
            } else {
                userInfo.password = hashedPassword;
                return callback()
            }
        });
    }
};


module.exports = {
    userSchema: userSchema,
    User: mongoose.model("User", userSchema)
};

const Article = require("./article").Article;

userSchema.add({
    bookmarks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Article",
        validate: {
            validator: (articleId, done) => {
                Article.count({ _id: articleId })
                //TODO: log
                    .then(count => done(count), err => done(false, err));
            },
            message: "Article Does Not Exist"
        }
    }]
});

const Business = require("./business").Business;
userSchema.add({
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Business",
        validate: {
            validator: (businessId, done) => {
                Business.count({ _id: businessId })
                //TODO: log
                    .then(count => done(count), err => done(false, err));
            },
            message: "Business Does Not Exist"
        }
    }]
});

const Tag = require("./tag").Tag;
userSchema.add({
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
        validate: {
            validator: (tagId, done) => {
                Tag.count({ _id: tagId })
                //TODO: log
                    .then(count => done(count), err => done(false, err));
            },
            message: "Tag Does Not Exist"
        }
    }]
});

const Attend = require("./event").Event;
userSchema.add({
    attends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attend",
        validate: {
            validator: (attendId, done) => {
                Attend.count({ _id: attendId })
                //TODO: log
                    .then(count => done(count), err => done(false, err));
            },
            message: "Attend Does Not Exist"
        }
    }]
});