const router = require('express').Router()
const Inventory = require('../models/inventoryModal')
const User = require('../models/userModel')
const authMiddleware = require('../middlewares/authMiddleware')

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
            const organization = req.body.userId;

            const totalInputOfRequestedGroup = await Inventory.aggregate(
                {
                    $match: {},
                },
                {
                    $group: {
                        _id: "$bloodGroup",
                        total: { $sum: "$quantity"}
                    }
                }
            )
            console.log(totalInOfRequestedGroup);
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
        const inventory = await Inventory.find({ organization: req.body.userId }).populate("donar").populate("hospital")
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