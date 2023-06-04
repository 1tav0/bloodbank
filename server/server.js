const express = require('express');
const mongoose = require('mongoose');
const { mongodb } = require('./keys');
const app = express();
const port = process.env.PORT || 5000;

// mongoose.set('strictQuery', true)
//         .connect(mongodb)
//         .then(() => console.log("connected tp db"))
//         .catch(err => console.log(err))

app.listen(port, () => {
    console.log(`running on port ${port}`)
})