const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
    tag: {
        arabic: {
            type: String,
            required: true
        },
        english: {
            type: String,
            required: true
        }
    },
    color: {
        type: String,
        required: true
    },
});

tagSchema.statics.createTag = function(tagInfo) {
    return this.create(tagInfo);
};

tagSchema.statics.getTags = function () {
    return this.find();
};

tagSchema.methods.updateTag = function (tagInfo) {
    return this.update(tagInfo, { runValidators: true });
};

tagSchema.methods.removeTag = function () {
    return this.remove()
};

const Tag = mongoose.model("Tag", tagSchema);


module.exports = {
    tagSchema: tagSchema,
    Tag: Tag
};


