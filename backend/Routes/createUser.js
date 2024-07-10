const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const jwtSecret = "HElloThisis shraddhakumbhar@#$%";

router.post("/createuser", 
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'Incorrect Password').isLength({ min: 5 })
,async(req, res) => {
    try {
        console.log(req.body)
        // const {name, password, email, location} = req.body
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        
        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt)

        await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
            location: req.body.location
        })
        // res.send(info)
        res.json({success: true})

    } catch (error) {
        console.log("error", error)
        res.json({success: false})
    }
})

router.post("/loginuser",
    body('email').isEmail(),
    body('password', 'Incorrect Password').isLength({ min: 5 })
,async(req, res) => {
    let email = req.body.email;
    try {

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }

        let userdata = await User.findOne({email})

        if(!userdata) {
            return res.status(400).json({errors: "Try Loggin with correct credentials"})
        }

        const pwdCompare = await bcrypt.compare(req.body.password, userdata.password) 

        if(!pwdCompare) {
            return res.status(400).json({errors: "Try Loggin with correct credentials"})
        }

        const data = {
            user: userdata.id
        }

        const authToken = jwt.sign(data, jwtSecret)

        return res.json({success: true, authToken: authToken})

    } catch (error) {
        console.log("error", error)
        res.json({success: false})
    }
})

module.exports = router;