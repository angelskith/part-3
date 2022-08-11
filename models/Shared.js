const mongoose = require('mongoose');

const sharedSchema = mongoose.Schema({
    fileId: {
        type: mongoose.SchemaTypes.ObjectId,
        require: true
    },
    sharedBy: {
        type: String,
        require: true
    }
    
})


module.exports = mongoose.model("Shared", sharedSchema);