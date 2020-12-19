const express = require("express")
const exphbs  = require('express-handlebars')
const path = require("path")
const app = express()
const port = 3000
// const moment = require("moment")
const hostname = "127.0.0.1"
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const generateDate = require("./helpers/generateDate").generateDate


mongoose.connect('mongodb://127.0.0.1/nodeblogDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

app.use(fileUpload())

app.use(express.static("public"))



app.engine("handlebars", expressHandlebars({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  helpers: {
    generateDate
  }
}), exphbs());
app.set("view engine", "handlebars");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

const main = require("./routes/main")
const posts = require("./routes/posts")
const users = require("./routes/users")

app.use("/", main)
app.use("/posts", posts)
app.use("/users", users )





app.listen(port, hostname, (req, res) => {
    console.log(`I'm listenin http://${hostname}:${port}/`)
})