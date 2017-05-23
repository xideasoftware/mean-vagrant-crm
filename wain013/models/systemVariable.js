const mongoose = require("mongoose");

const STATUS = {
    STRING: "STRING",
    BOOLEAN: "BOOLEAN",
    NUMBER: "NUMBER",
    HTML: "HTML"
};

const systemVariableSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        required: true
    },
    group: {
        type: Number,
        required: true
    },
    isSerializable: {
        type: Boolean,
        required: true
    },
    isHidden: {
        type: Boolean,
        required: true
    },
    type: {
        type: String,
        enum: [ STATUS.STRING, STATUS.BOOLEAN, STATUS.NUMBER, STATUS.HTML ],
        default: STATUS.STRING
    },
});

systemVariableSchema.statics.createSystemVariable = function(systemVariableInfo) {
    return this.create(systemVariableInfo);
};

systemVariableSchema.statics.getFilteredSystemVariables = function (group) {
    return this.find({ group: group, isHidden:false }).sort({ order: 'asc' });
};

systemVariableSchema.statics.getAllSystemVariables = function () {
    return this.find().sort({ order: 'asc' });
};

systemVariableSchema.statics.getSystemVariables = function () {
    return this.find({ isHidden:false }).sort({ order: 'asc' });
};

systemVariableSchema.methods.updateSystemVariable = function (systemVariableInfo) {
    return this.update(systemVariableInfo, { runValidators: true });
};

systemVariableSchema.methods.removeSystemVariable = function () {
    return this.remove()
};

systemVariableSchema.methods.hide = function () {
    this.isHidden = true;
    return this.save();
};

systemVariableSchema.methods.show = function () {
    this.isHidden = false;
    return this.save();
};

const SystemVariable = mongoose.model("SystemVariable", systemVariableSchema);


module.exports = {
    systemVariableSchema: systemVariableSchema,
    SystemVariable: SystemVariable
};


