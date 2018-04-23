const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

mongoose.Promise = global.Promise;
const MONGODB_URL = "mongodb://localhost:27017/users";
mongoose.connect(MONGODB_URL);
mongoose.connection.on('error', ()=>{
    console.log('Error connecting to MongoDb');
});
mongoose.connection.on('open', ()=>{
    console.log('Connected to Db');
});

const PORT = process.env.PORT || 6942;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

require('./app/routes/user.routes.js')(app);
app.get('/', (req,res)=>{
    res.sendFile('index.html', {root: __dirname });
});
app.listen(PORT, ()=>{
    console.log('[SERVER] Server running on port '+PORT);
});
