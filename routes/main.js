const express = require("express")
const Post = require("../models/Post")
const Category = require("../models/Category")
const User = require("../models/User")

const router = express.Router()
router.get("/", (req, res) => {
    console.log(req.session)
    res.render('site/index')
})




router.get("/blog", (req, res) => {
    Post.find({}).populate({path: "author", model: User}).sort({$natural:-1}).then(posts => {
        Category.aggregate([
            {
                $lookup:{
                    from: "posts",
                    localField: "_id",
                    foreignField: "category",
                    as: "posts"
                }
            },
            {
                $project:{
                    _id: 1,
                    name:1,
                    num_of_posts: {$size: "$posts"}

                }
            }
        ]).then(categories =>{
            res.render('site/blog', {posts, categories})

        })
        

    }).catch(err =>{
        console.log(err)
    })
    
})


router.get("/contact", (req, res) => {
    
    res.render('site/contact')
})






module.exports = router