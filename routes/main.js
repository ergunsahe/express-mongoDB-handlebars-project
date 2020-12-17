const express = require("express")

const router = express.Router()
router.get("/", (req, res) => {
    res.render('site/index')
})


router.get("/about", (req, res) => {
    res.render('site/about')
})


router.get("/blog", (req, res) => {
    
    res.render('site/blog')
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
router.get("/post/new", (req, res) => {
    
    res.render('site/addpost')
})
router.post("/post/test", (req, res) => {
    
    res.send("test ok")
})

module.exports = router