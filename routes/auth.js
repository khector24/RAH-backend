require('dotenv').config();

const express = require('express');
const router = express.Router();
const JWT = require("jsonwebtoken")
const bcrypt = require('bcrypt');

const { check, validationResult } = require('express-validator');

router.post('/sign-up', [
    check('phoneNumber')
        .isMobilePhone('en-US')
        .withMessage('Please provide a valid mobile phone number.'),
    check("password")
        .isStrongPassword([
            {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
                returnScore: false
            }
        ]).withMessage("A strong password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one special symbol.")
], (req, res) => {
    const { phoneNumber, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }


    res.send("Validation Passed!");
});

// LOGIN
router.post('/login', async (req, res) => {
    const { firstName, phoneNumber, password } = req.body
    // Check if user with email exists

    let manager = managers.find((manager) => {
        return manager.firstName === firstName
    });

    if (!manager) {
        return res.status(422).json({
            errors: [
                {
                    msg: "Invalid Credentials",
                }
            ]
        })
    }

    // Check if the password if valid
    let isMatch = await bcrypt.compare(password, manager.password);

    if (!isMatch) {
        return res.status(404).json({
            errors: [
                {
                    msg: "Invalid Credentials"
                }
            ]
        })
    }

    // Send JSON WEB TOKEN
    const token = await JWT.sign({ firstName },
        process.env.SECRET,
        { expiresIn: 360000 })

    res.json({
        token
    })
})


module.exports = router;