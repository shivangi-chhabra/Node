var express = require('express')
var app = express();
var mongoose = require('mongoose')
var User = require('./models/User')
var db = require('./mysetup/myurl').myurl
var port = process.env.PORT || 3000

mongoose.connect(db)
        .then(()=>{
            console.log("Database is connected")
        })
        .catch(err => {
            console.log("Error is ", err.message)
        })

app.get('/', (req, res) =>{
    res.status(200).send('Hi welcome to the login and Signup API')
})

app.listen(port, ()=>{
    console.log('Server is satarted on port ${port}')
})