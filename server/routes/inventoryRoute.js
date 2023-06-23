const router = require('express').Router()
const Inventory = require('../models/inventoryModal')
const User = require('../models/userModel')
const authMiddleware = require('../middlewares/authMiddleware')
const mongoose = require("mongoose")
//add inventory
router.post('/add', authMiddleware, async (req, res) => {
    try {
        //validate email and inventoryType
        const user = await User.findOne({ email: req.body.email })
        if (!user) throw new Error("Invalid Email")

        if (req.body.inventoryType === "in" && user.userType !== "donar") {
            throw new Error("This email is not registered as a donar")
        }

        if (req.body.inventoryType === "out" && user.userType !== "hospital") {
            throw new Error("This email is not registered as a hospital")
        }
        //create inventory
        if (req.body.inventoryType === "out") {
            //check if inventory is available
            const requestedGroup = req.body.bloodGroup;
            const requestedQuantity = req.body.quantity;
            // const organization = req.body.userId; this didnt work so we did the bottom to get input when we add inventoriy in
            const organization = new mongoose.Types.ObjectId(req.body.userId); //convert from objectID in db to userId

            const totalInOfRequestedGroup = await Inventory.aggregate([
                {
                    $match: {
                        organization,
                        inventoryType: "in",
                        bloodGroup: requestedGroup,
                    },
                },
                {
                    $group: {
                        _id: "$bloodGroup",
                        total: { $sum: "$quantity"}
                    }
                }
            ])
            // console.log(totalInOfRequestedGroup);
            const totalIn = totalInOfRequestedGroup[0].total || 0;

            const totalOutOfRequestedGroup = await Inventory.aggregate([
                {
                    $match: {
                        organization,
                        inventoryType: "out",
                        bloodGroup: requestedGroup
                    }
                }, {
                    $group: {
                        _id: "$bloodGroup",
                        total: { $sum: "$quantity" }
                    }
                }
            ])

            const totalOut = totalOutOfRequestedGroup[0]?.total || 0;

            const availableQuantityOfRequestedGroup = totalIn - totalOut;

            if (availableQuantityOfRequestedGroup < requestedQuantity) {
                throw new Error(`Only ${availableQuantityOfRequestedGroup} units of ${requestedGroup.toUpperCase()} is available`);
            }

            req.body.hospital = user._id
        } else {
            req.body.donar = user._id
        }
        //add invetory
        const inventory = new Inventory(req.body);
        await inventory.save();

        return res.send({
            success: true,
            message: "Inventory Added Successfully"
        })

    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        })
    }
})

router.get('/get', authMiddleware, async (req, res) => {
    try {
        const inventory = await Inventory.find({ organization: req.body.userId })
                                        .sort({createdAt: -1}) //this sorts the table in the front end from time was created goes top most
                                        .populate("donar")
                                        .populate("hospital")
                
                                        
        return res.send({
            success: true,
            data: inventory
        })
    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        })
    }
})

router.post('/filter', authMiddleware, async (req, res) => {
    try {
        // console.log(req.body.filters);
        const inventory = await Inventory.find(req.body.filters).limit(req.body.limit || 10)
                                        .sort({createdAt: -1}) //this sorts the table in the front end from time was created goes top most
                                        .populate("donar")
                                        .populate("hospital")
                                        .populate("organization")
                                        
        return res.send({
            success: true,
            data: inventory
        })
    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        })
    }
})
module.exports = router