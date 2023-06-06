const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/userModel')
const jwt  = require("jsonwebtoken");
const authMiddleware = require('../middlewares/authMiddleware');
//register new user
router.post('/register', async (req, res) => {
    try {
        //check if user exists
        console.log(req.body)
        const userExists = await User.findOne({ email: req.body.email })
        if (userExists) {
            return res.send({
                success: false,
                message: "User with email already exists"
            })
        }
        //user doesnt exist so we hash their password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        req.body.password = hashedPassword;
        //save the user
        const user = new User(req.body);
        await user.save();
        // console.log(user);
        //if we save successfully
        return res.send({
            success: true,
            message: "User registered Successfully"
        })
        
    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        })
    }
})

//login user
router.post('/login', async (req, res) => {
    try {
        //check if user exists
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.send({
                success: false,
                message: "No User with that email exists"
            })
        }
        //user exists so we COMPARE passwords
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword) {
            return res.send({
                success: false,
                message: "Invalid Password"
            })
        }
        //GENERATE TOKEN to send to the frontend 
        const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {expiresIn: "1d"})

        return res.send({
            success: true,
            message: "User logged in Successfully",
            data: token
        })
    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        })
    }
})

//get the current user 
router.get("/get-current-user", authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId }) 
        //remove password from user object
        // user.password = undefined
        return res.send({
            success: true,
            message: "User fetched successfully",
            data: user,
        })
    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        })

    }
})
module.exports = router