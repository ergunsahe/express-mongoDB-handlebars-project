const express = require("express")
const exphbs  = require('express-handlebars')
const path = require("path")
const app = express()
const port = 3000
const hostname = "127.0.0.1"

app.use(express.static("public"))
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get("/", (req, res) => {
    res.render('site/index')
})

app.get("/about", (req, res) => {
    res.render('site/about')
})

app.get("/blog", (req, res) => {
    
    res.render('site/blog')
})

app.get("/contact", (req, res) => {
    
    res.render('site/contact')
})
app.get("/login", (req, res) => {
    
    res.render('site/login')
})
app.get("/register", (req, res) => {
    
    res.render('site/register')
})



app.listen(port, hostname, (req, res) => {
    console.log(`I'm listenin http://${hostname}:${port}/`)
})