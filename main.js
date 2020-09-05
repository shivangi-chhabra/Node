var express = require('express')
var bodyParser = require('body-parser') 
var mongoose = require('mongoose')
var User = require('./models/User')
var db = require('./mysetup/myurl').myurl
var app = express();

var port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended : false}));
app.use(bodyParser.json())

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

app.post("/signup", async (req, res) => {
    var newUser = new User({
        username : req.body.username,
        email : req.body.email,
        password : req.body.password
    })
    await newUser.save()
             .then(()=>{
                 res.status(200).send(newUser)
             })
             .catch(err => {
                 console.log("Error is ", err.message)
             })
})



app.listen(port, ()=>{
    console.log('Server is satarted on port ${port}')
})