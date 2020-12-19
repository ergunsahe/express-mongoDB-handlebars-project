const express = require("express")
const User = require("../models/User")
const path = require("path")

const router = express.Router()

router.get("/register", (req, res) => {
    res.render('site/register')
})
router.post("/register", (req, res) => {
    User.create(req.body, (error, user) =>{
        if (error){
            res.status(400).json({errors: {message:"User already exist"}})

        }
        res.redirect("/")
    })
    
})

router.get("/login", (req, res) => {
    
    res.render('site/login')
})

router.post("/login", (req, res) => {
    const {email, password} = req.body
    User.findOne({email}, (error, user) =>{
        if (user){
            if (user.password === password){
                // user session
                res.redirect("/")
            }else {
                res.redirect("/users/login")
            }
        }else{
            res.redirect("/users/register")
        }
    })
      
})

module.exports = router