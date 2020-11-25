const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const bcrypt = require('bcryptjs')

router.get('/', (req, res) => {
    res.send('hello')
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
                        res.json({message: 'Successfully signed in.'})
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        })
})

module.exports = router