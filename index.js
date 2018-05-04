const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const CryptoJS = require('crypto-js');

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

app.get('/authenticate', (req,res)=>{
    const uid = req.query.uid;
    let srckey = req.query.srckey;
    let currkey = new Date().getMinutes();

    var iv = CryptoJS.enc.Latin1.parse(currkey);

    var ciphertextsrc = CryptoJS.AES.encrypt(
        uid,
        srckey,
        { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding }
    );
    var ciphertextcurr = CryptoJS.AES.encrypt(
        uid,
        currkey,
        { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding },
    );

    console.log('SRC KEY: ' + (srckey==currkey?ciphertextcurr.key=ciphertextsrc.key:srckey).toString() + '\tSRC: ' + ciphertextsrc + '\tCURRKEY: ' + ciphertextcurr.key+'\tCURR: '+ciphertextcurr);
    if (ciphertextcurr.key.toString()===ciphertextsrc.key.toString()) {
        res.status(200).json({
            "auth": "success"
        });
    } else res.status(200).json({
        "auth": "failure"
    });
});

app.listen(PORT, ()=>{
    console.log('[SERVER] Server running on port '+PORT);
});
