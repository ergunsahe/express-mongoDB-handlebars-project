const express = require("express")
const Post = require("../models/Post")
const path = require("path")

const router = express.Router()

router.get("/", (req, res) => {
    res.render('site/index')
})



router.get("/new", (req, res) => {
    if (req.session.userId){
        return res.render('site/addpost')

    }else {
        res.redirect("/users/login")
    }
})

router.get("/:id", (req, res) => {
    Post.findById(req.params.id).then(post =>{
        res.render("site/post", {post})
    })
    
})

router.post("/test", (req, res) => {
    let post_image = req.files.post_image
    post_image.mv(path.resolve(__dirname, '../public/img/postimages', post_image.name))
    Post.create({
        ...req.body,
        post_image: `/img/postimages/${post_image.name}`
    })
    
    res.redirect("/")
})

module.exports = router