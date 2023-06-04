const mongoose = require('mongoose');
const mongodb = process.env.mongodb;
mongoose.connect(mongodb)    
const connect = mongoose.connection;

// verify the connection 
connect.on('connected', () => {
    console.log("Connected to db succesfully")
})

//verify connection error
connect.on('error', (err) => {
    console.log("Connection to db failed", err)
})