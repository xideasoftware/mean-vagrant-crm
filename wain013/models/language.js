const mongoose = require("mongoose");


const languageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

languageSchema.statics.createLanguage = function (languageInfo) {
    return this.create(languageInfo);
};

languageSchema.methods.updateLanguage = function (languageInfo) {
    return this.update(languageInfo, { runValidators: true })
};

languageSchema.methods.removeLanguage = function () {
    return this.remove();
};

languageSchema.statics.getLanguages = function () {
    return this.find();
};


module.exports = {
    languageSchema: languageSchema,
    Language: mongoose.model("Language", languageSchema)
};