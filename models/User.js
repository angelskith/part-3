const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullName : {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    confirmPassword: {
        type: String,
        require: true
    }
})

// const User = mongoose.model("user", userSchema);
// module.exports = User;
module.exports = mongoose.model("User", userSchema);