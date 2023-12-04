const mongoose = require('mongoose');

// var mongoURL = 'mongodb://localhost:27017/ashDB';
var mongoURL = 'mongodb+srv://aayushbisht501:XHwD29mYEvCjpQTf@cluster0.ab4zp1l.mongodb.net/'

mongoose.connect(mongoURL, {useUnifiedTopology : true, useNewUrlParser : true});

var connection = mongoose.connection;

connection.on('error', ()=>{
    console.log("MongoDB connection failed");
});
connection.on('connected', ()=>{
    console.log("MongoDB connected Successfully");
});

module.exports = mongoose;