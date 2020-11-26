const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')

const mongoose = require('mongoose')
const User = mongoose.model("User")

module.exports = (req, res, next) => {
    const {authorization} = req.headers
    if (!authorization) {
        return res.status(422).json({error: "you must be logged in."})
    }
    
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, JWT_SECRET, (error, payload) => {
        if (error) {
            return res.status(422).json({error: "you must be logged in."})
        }

        const {_id} = payload
        User.findById(_id)
            .then(foundUser => {
                req.user = foundUser
                next()
            })
    })
}