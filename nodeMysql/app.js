
const express = require('express')
const  bodyParser = require('body-parser')

const peopleRouter = require('./routes/people')
const mysqlConnection = require('./connection')

var app = express()

app.use(bodyParser.json())

app.use('/people', peopleRouter)



app.listen(3000)
