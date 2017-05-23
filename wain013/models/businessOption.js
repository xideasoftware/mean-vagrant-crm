const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
    option: {
        arabic: {
            type: String,
            required: true
        },
        english: {
            type: String,
            required: true
        }
    }
});

optionSchema.statics.createOption = function(OptionInfo) {
    return this.create(OptionInfo);
};

optionSchema.statics.getOptions = function () {
    return this.find().populate('parent');
};

optionSchema.methods.updateOption = function (OptionInfo) {
    return this.update(OptionInfo, { runValidators: true });
};

optionSchema.methods.removeOption = function () {
    return this.remove()
};

const BusinessOption = mongoose.model("BusinessOption", optionSchema);

optionSchema.add({
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BusinessOption",
        validate: {
            validator: (OptionId, callback) => {
                BusinessOption.count({ _id: OptionId})
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
    optionSchema: optionSchema,
    BusinessOption: BusinessOption
};


