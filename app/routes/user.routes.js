module.exports = function(app) {

    var users = require('../controllers/user.controller.js');

    app.post('/users', users.create);
    // Retrieve all Notes
    app.get('/users', users.findAll);

    app.get('/users/:emailId', users.find);

    app.delete('/users/:userid', users.delete);
}