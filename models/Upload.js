const mongoose = require('mongoose');

const uploadSchema = mongoose.Schema({
    filelabel : {
        type: String,
    },
    filename : {
        type: String
    }
   
})


module.exports = mongoose.model("Upload", uploadSchema);