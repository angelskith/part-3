const mongoose = require('mongoose');
const MONGODB_URL = "mongodb://localhost:27017/dashboard";
mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});