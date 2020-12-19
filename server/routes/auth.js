const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const requireLogin = require("../middleware/require-login")

router.get('/protected', requireLogin, (req, res) => {
    res.send("Hello user.")
})

router.post('/signup', (req, res) => {
    const {name, email, password} = req.body
    if(!name || !password || !email) {
        return res
            .status(422)
            .json({error: "Please send all required fields!"})
    }
    User.findOne({email: email})
        .then(savedUser => {
            if(savedUser) {
                return res.status(422).json({error: 'User already exists with that email!'})
            }

            bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    const user = new User({
                        email,
                        name,
                        password: hashedPassword
                    })
        
                    user.save()
                        .then(savedUser => {
                            res.json('User was saved successfully!')
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })
                .catch(err => {
                    console.log(err)
                })
        })
        .catch(err => {
            console.log(err)
        })
})

router.post('/signin', (req, res) => {
    const {email, password} = req.body
    if(!email || !password) {
        return res.status(422)
            .json({error: 'Please send email and password'})
    }
    User.findOne({email: email})
        .then(savedUser => {
            if(!savedUser) {
                return res.status(422)
                    .json({error: "Email or password is not correct"})
            }
            bcrypt.compare(password, savedUser.password)
                .then(isMatched => {
                    if(!isMatched) {
                        return res.status(422)
                            .json({error: 'Invalid email or password'})
                    } else {
                        //res.json({message: 'Successfully signed in.'})
                        const token = jwt.sign({_id: savedUser._id}, JWT_SECRET)
                        const {_id, name, email} = savedUser
                        res.json({
                            token, 
                            user: {
                                _id,
                                name,
                                email
                            }
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({error: err})
                })
        })
})

module.exports = router