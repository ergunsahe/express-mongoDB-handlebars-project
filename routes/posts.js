const express = require("express")
const Post = require("../models/Post")

const router = express.Router()
router.get("/", (req, res) => {
    res.render('site/index')
})



router.get("/new", (req, res) => {
    
    res.render('site/addpost')
})

router.get("/:id", (req, res) => {
    Post.findById(req.params.id).then(post =>{
        res.render("site/post", {post})
    })
    
})

router.post("/test", (req, res) => {
    
    Post.create(req.body)
    res.redirect("/")
})

module.exports = router