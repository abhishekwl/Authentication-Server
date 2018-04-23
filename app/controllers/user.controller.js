var User = require('../models/user.model.js');

exports.create = function(req, res) {

};

exports.findAll = function(req, res) {
    console.log(req.query);

    var user = new User({
        username: req.query.username,
        email: req.query.email,
        password: req.query.password
    });
    user.save((err,data)=>{
        if(err) {
            console.log(err);
            res.status(500).send({ message: "Error creating user" });
        } else res.status(200).send(data);
    });
};

exports.find = function(req, res) {
};

exports.delete = function(req, res) {
    // Delete a note with the specified noteId in the request

};