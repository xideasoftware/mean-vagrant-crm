const mongoose = require("mongoose");


const optionSchema = new mongoose.Schema({
    englishOption: {
        type: String,
        required: true
    },
    arabicOption: {
        type: String,
        required: true
    }
});

module.exports = optionSchema;