const express = require('express')
const mongoose = require('mongoose')

const requireLogin = require('../middleware/require-login')

const router = express.Router()
const Post = mongoose.model("Post")

router.get('/all-posts', (req, res) => {
    Post.find()
        .populate("postedBy", "_id name")
        .then(foundPosts =>  {
            res.status(200)
                .json({
                    posts: foundPosts
                })
        })
        .catch(error => {
            res.status(422)
                .json({
                    error
                })
        })
})

router.post("/create-post", requireLogin, (req, res) => {
    const {
        title,
        body
    } = req.body
    if (!title || !body) {
        return res.status(422).json({error: "Please send all required fields."})
    }

    req.user.password = undefined

    const post = new Post({
        title,
        body,
        postedBy: req.user
    })

    post.save()
        .then(result => {
            res.status(200)
                .json({
                    post: result
                })
        })
        .catch(error => {
            console.log(error)
            res.status(422)
                .json({
                    error
                })
        })
})

router.get("/my-posts", requireLogin, (req, res) => {
    Post.find({postedBy: req.user._id})
        .populate("postedBy", "_id name")
        .then(foundPosts => {
            res.status(200)
                .json({
                    posts: foundPosts
                })
        })
})

module.exports = router