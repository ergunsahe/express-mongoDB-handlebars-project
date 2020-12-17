const express = require("express")
const Post = require("../models/Post")

const router = express.Router()
router.get("/", (req, res) => {
    res.render('site/index')
})



router.get("/new", (req, res) => {
    
    res.render('site/addpost')
})
router.post("/test", (req, res) => {
    
    Post.create(req.body)
    res.redirect("/")
})

module.exports = router