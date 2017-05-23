const mongoose = require("mongoose");


const collectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

collectionSchema.statics.createCollection = function(collectionInfo) {
    return this.create(collectionInfo);
};

collectionSchema.methods.updateCollection = function (collectionInfo) {
    return this.update(collectionInfo, { runValidators: true });
};

collectionSchema.methods.removeCollection = function () {
    return this.remove();
};

collectionSchema.statics.getCollections = function () {
    return this.find();
};


const Collection = mongoose.model("Collection", collectionSchema);

collectionSchema.add({
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection",
        validate: {
            validator: (collectionId, callback) => {
                //TODO: log
                Collection.count({ _id: collectionId})
                    .then(count => callback(count), err => callback(false, err) )
            },
            message: "Collection Does Not Exist"
        }
    }
});


module.exports = {
    collectionSchema: collectionSchema,
    Collection: Collection
};