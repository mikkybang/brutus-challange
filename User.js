const mongoose = require('mongoose');
// User schema
const userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        // required: 'Please Supply an email address'
    },
    name: {
        type: String,
        // required: true,
        trim: true
    },
    password: {
        type: String,
    },


})


module.exports = mongoose.model('User', userSchema);