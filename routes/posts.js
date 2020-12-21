const express = require("express")
const Post = require("../models/Post")
const path = require("path")
const Category = require("../models/Category")
const User = require("../models/User")

const router = express.Router()

// router.get("/", (req, res) => {
//     res.render('site/index')
// })



router.get("/new", (req, res) => {
    if (!req.session.userId){
         res.redirect('users/login')

    }
    Category.find({}).then(categories =>{
        res.render("site/addpost", {categories})
    })
})

router.get("/:id", (req, res) => {
    Post.findById(req.params.id).populate({path: "author", model: User}).then(post =>{
        Category.find({}).sort({$natural:-1}).then(categories =>{
            res.render('site/post', {post, categories})

        })
        
    })
    
})

router.post("/test", (req, res) => {
    let post_image = req.files.post_image
    post_image.mv(path.resolve(__dirname, '../public/img/postimages', post_image.name))
    Post.create({
        ...req.body,
        post_image: `/img/postimages/${post_image.name}`,
        author : req.session.userId

    })
    
    req.session.sessionFlash = {
        type: "alert alert-success",
        message: "Your post is successfully created"
    }
    res.redirect("/blog")
})

module.exports = router