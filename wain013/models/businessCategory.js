const mongoose = require("mongoose");
const imageSchema = require("./image");

const categorySchema = new mongoose.Schema({
    name: {
        arabic: {
            type: String,
            required: true
        },
        english: {
            type: String,
            required: true
        }
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BusinessCategory",
        validate: {
            validator: (categoryId, done) => {
                BusinessCategory.count({ _id: categoryId })
                //TODO: Log
                    .then(count => done(count), err => done(false, err) )
            }
        }
    },
    icon: imageSchema,
    color: {
        type: String,
        required: true
    },
});

categorySchema.statics.createCategory = function(categoryInfo) {
    return this.create(categoryInfo);
};

categorySchema.statics.getCategories = function () {
    return this.find().populate('parent');
};

categorySchema.methods.updateCategory = function (categoryInfo) {
    return this.update(categoryInfo, { runValidators: true });
};

categorySchema.methods.removeCategory = function () {
    return this.remove()
};

const BusinessCategory = mongoose.model("BusinessCategory", categorySchema);

categorySchema.add({
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BusinessCategory",
        validate: {
            validator: (categoryId, callback) => {
                BusinessCategory.count({ _id: categoryId})
                    .then(count => {
                        return callback(count);
                    }, err => {
                        //TODO: log
                        return callback(0, err);
                    })
            }
        }
    }
});



module.exports = {
    categorySchema: categorySchema,
    BusinessCategory: BusinessCategory
};


