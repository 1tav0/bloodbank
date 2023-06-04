const express = require('express');
const mongoose = require('mongoose');
// const { mongodb } = require('../keys');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const mongodb = process.env.mongodb;
mongoose
        .connect(mongodb)
        .then(() => console.log("connected to db"))
        .catch(err => console.log(err))

app.listen(port, () => {
    console.log(`running on port ${port}`)
})