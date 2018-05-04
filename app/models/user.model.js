var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    uid: String,
    username: String,
    email: String,
    password: String,
    phoneNumber: String,
    securityQuestion: String,
    securityAnswer: String
}, {
    timestamps: true
});

module.exports = mongoose.model('user', userSchema);