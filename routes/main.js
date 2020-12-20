const express = require("express")
const Post = require("../models/Post")

const router = express.Router()
router.get("/", (req, res) => {
    console.log(req.session)
    res.render('site/index')
})


router.get("/about", (req, res) => {
    res.render('site/about')
})


router.get("/blog", (req, res) => {
    Post.find({}).then(posts => {
        res.render('site/blog', {posts})
        

    }).catch(err =>{
        console.log(err)
    })
    
})


router.get("/contact", (req, res) => {
    
    res.render('site/contact')
})






module.exports = router