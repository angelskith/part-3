const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    msg : {
        type: String,
    },
    date : {
        type: Date,
    } 
})

module.exports = mongoose.model("Chat", chatSchema);