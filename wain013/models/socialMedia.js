const mongoose = require("mongoose");
const validator = require("validator");

const socialMediaSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
        validate: {
            validator: website => {
                return validator.isURL(website);
            },
            message: "Must Be a Valid URL"
        }
    }
});

module.exports = socialMediaSchema;