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

    const postPerPage = 4
    const page = req.query.page || 1


    Post.find({}).populate({path: "author", model: User}).sort({$natural:-1})
        .skip((postPerPage * page) - postPerPage)
        .limit(postPerPage)
        .then(posts => {
            Post.countDocuments().then(postCount =>{

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
                    res.render('site/blog', {
                        posts, 
                        categories,
                        current: parseInt(page),
                        pages: Math.ceil(postCount/postPerPage)
        
                    })
        
                })
            })
        

    }).catch(err =>{
        console.log(err)
    })
    
})


router.get("/contact", (req, res) => {
    
    res.render('site/contact')
})






module.exports = router