const  connection = require('./models')

const express = require('express')

const app = express()

const path = require('path')
const bodyParser = require('body-parser')
const expressHandlebars = require('express-handlebars')
const courseController  = require('./controllers/course')

app.use(bodyParser.urlencoded({
    extended : true
}))

app.set('views', path.join( __dirname, "/views/"))

app.engine("hbs", expressHandlebars({
    extname: "hbs", 
    defaultLayout : "mainLayout",
    layoutsDir : __dirname + "/views/layouts"
}))

app.set("view engine", "hbs")

app.get('/', (req, res) => {
    //res.send('<h1>Hello World!!</h1>')
    res.render("index", {})
})

app.use('/course', courseController)

app.listen('3000', () => {
    console.log('Server Started')
})   