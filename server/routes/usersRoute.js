const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/userModel')
const jwt  = require("jsonwebtoken");
const authMiddleware = require('../middlewares/authMiddleware');
const Inventory = require("../models/inventoryModal")
const mongoose = require("mongoose");
const { unique } = require('joi/lib/types/array');

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
        //check if userType matches
        if (user.userType !== req.body.userType) {
            return res.send({
                success: false,
                message: `User is not registered as a ${req.body.userType}`
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

//get all unique donors
router.get("/get-all-donars", authMiddleware, async (req, res) => {
    try {
       //get all unique donor ids from inventory
    //    const uniqueDonorIds = await Inventory.aggregate([
    //     {
    //            $match: {
    //             inventoryType: "in",
    //             organization: new mongoose.Types.ObjectId(req.body.userId)
    //         }
    //     },
    //     {
    //         $group: {
    //             _id: "$donar"
    //         }
    //     }
    //    ]) 
        const organization = new mongoose.Types.ObjectId(req.body.userId)
        const uniqueDonorIds = await Inventory.distinct("donar", {
            organization,
        })//.find()

        const donars = await User.find({
            _id: { $in: uniqueDonorIds }
        })

        // console.log(uniqueDonorIds);

        return res.send({
            success: true,
            message: "Donors fetched successfully",
            // data: uniqueDonorIds didnt work properly cuz data wasnt being fetched correctly 
            data:donars
        })
    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        })
    }
})

router.get("/get-all-hospitals", authMiddleware, async (req, res) => {
    try {
        const organization = new mongoose.Types.ObjectId(req.body.userId);
        const uniqueHospitals = await Inventory.distinct("hospital", {
            organization
        })

        const hospitals = await User.find({
            _id: { $in: uniqueHospitals }
        })

        return res.send({
            success: true,
            message: "Hospitals fetched successfully",
            data: hospitals
        })
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        })
    }
})
//get all organizations for a donar
router.get("/get-all-organizations-of-a-donar", authMiddleware, async (req, res) => {
    try {
        //get all unique organizations from inventory
        const donar = new mongoose.Types.ObjectId(req.body.userId);
        const uniqueOrganizationIds = await Inventory.distinct("organization", {
            donar
        })

        const organization = await user.find({
            _id: { $in: uniqueOrganizationIds }
        })

        return res.send({
            success: true,
            message: "Organizations fetched successfully",
            data: organization
        })
    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        })
    }
})
module.exports = router