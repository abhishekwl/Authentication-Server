var User = require('../models/user.model.js');

exports.create = function(req, res) {

};

exports.findAll = function(req, res) {
    console.log(req.query);

    var user = new User({
        uid: req.query.uid,
        username: req.query.username,
        email: req.query.email,
        password: req.query.password,
        phoneNumber: req.query.phone,
        securityQuestion: req.query.sq,
        securityAnswer: req.query.sa
    });
    user.save((err,data)=>{
        if(err) {
            console.log(err);
            res.status(500).json({ message: "Error creating user" });
        } else {
            res.status(200).json(data);
            console.log(data);
        }
    });
};

exports.find = function(req, res) {
    User.findOne({ email: req.params.emailId }, (err,data)=>{
        if(err) {
            console.log(err);
            res.status(500).json({ message: "Error fetching user" });
        } else res.status(200).json(data);
    });
};

exports.delete = function(req, res) {
    // Delete a note with the specified noteId in the request
    User.findOneAndRemove({ phoneNumber: req.query.phone }, (err,data)=>{
        if(err) {
            console.log(err);
            res.status(500).json({ message: "Error deleting user" });
        } else res.status(200).json(data);
    });
};