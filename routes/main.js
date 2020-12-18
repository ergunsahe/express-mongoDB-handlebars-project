const express = require("express")
const Post = require("../models/Post")

const router = express.Router()
router.get("/", (req, res) => {
    res.render('site/index')
})


router.get("/about", (req, res) => {
    res.render('site/about')
})


router.get("/blog", (req, res) => {
    Post.find({}).then(posts => {
        res.render('site/blog', {posts})
        console.log(posts)

    }).catch(err =>{
        console.log(err)
    })
    
})


router.get("/contact", (req, res) => {
    
    res.render('site/contact')
})

router.get("/login", (req, res) => {
    
    res.render('site/login')
})

router.get("/register", (req, res) => {
    
    res.render('site/register')
})


module.exports = router