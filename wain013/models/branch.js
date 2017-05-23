const mongoose = require("mongoose");
const validator = require("validator");

const branchSchema = new mongoose.Schema({
    phoneNumber: {
        type: Number,
        required: true
        //TODO: validate
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: (email) => {
                return validator.isEmail(email);
            }
        }
    },
    location: {
        latitude: {
            type: String,
            required: true
        },
        longitude: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        }

    },

    address: {
        arabic: {
            type: String
        },
        english: {
            type: String
        }
    },

    openingHours: {
        arabic: {
            type: String
        },
        english: {
            type: String
        }
    }
});

module.exports = branchSchema;