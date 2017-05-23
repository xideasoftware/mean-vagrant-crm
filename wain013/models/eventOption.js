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

const EventOption = mongoose.model("EventOption", optionSchema);

optionSchema.add({
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "EventOption",
        validate: {
            validator: (OptionId, callback) => {
                EventOption.count({ _id: OptionId})
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
    EventOption: EventOption
};


