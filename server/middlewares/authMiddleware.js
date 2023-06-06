const jwt = require("jsonwebtoken")
//this middleware has a separate file to recycle this logic for all api calls for the rest of the app routes
module.exports = function (req, res, next) {
    try {
        const token = req.header("authorization").replace("Bearer ", "");
        const decryptedData = jwt.verify(token, process.env.JWT_KEY)
        req.body.userId = decryptedData.userId; //attach the user id to the request bode then we procceed next
        next();
    } catch (error) { //anything goes wrong we send the error to the front end 
        return res.send({
            success: false,
            message: error.message
        })
    }
}