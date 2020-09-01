const  connection = require('./models')

const express = require('express')

const app = express()

const path = require('path')
const bodyParser = require('body-parser')
const expressHandlebars = require('express-handlebars')
const { urlencoded } = require('express')
const { Console } = require('console')

app.use(bodyParser, urlencoded({extended : true}))

app.get('/', (req, res) => {
    res.send('<h1>Hello World!!</h1>')
})

app.listen('3000', () => {
    console.log('Server Started')
})