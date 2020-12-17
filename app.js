const express = require("express")
const exphbs  = require('express-handlebars')
const path = require("path")
const app = express()
const port = 3000
const hostname = "127.0.0.1"
const mongoose = require("mongoose")

mongoose.connect('mongodb://127.0.0.1/nodeblogDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

app.use(express.static("public"))
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const main = require("./routes/main")
app.use("/", main)





app.listen(port, hostname, (req, res) => {
    console.log(`I'm listenin http://${hostname}:${port}/`)
})