const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const userSchema = require('../schemas/userSchema');
const bcrypt = require('bcrypt');

const User = new mongoose.model("User", userSchema);

// SIGNUP
router.post('/signup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            password: hashedPassword
        });

        await newUser.save();

        res.status(200).json({
            message: 'Signup was successful!',
        })
    } catch (error) {
        res.status(500).json({
            error: 'Signup failed!',
        })
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    const user = await User.find({username: req.body.username});
    if(user && user.length > 0){
        const isValidPassword = await bcrypt.compare(req.body.password, user[0].password);

        if(isValidPassword){
            // generate token
            
        } else {
            res.status(401).json({
            error: 'Authentication failed!'
        });
        }
    } else {
        res.status(401).json({
            error: 'Authentication failed!'
        });
    }
})

module.exports = router;