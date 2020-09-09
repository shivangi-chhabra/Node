var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser') 

var passport = require('passport')


var db = require('./mysetup/myurl').myurl
var app = express()
var User = require('./routes/user')



var port = process.env.PORT || 3000



app.use(bodyParser.urlencoded({ extended : false}));
app.use(bodyParser.json())

mongoose.connect(db,{useNewUrlParser:true, useUnifiedTopology: true})
        .then(()=>{
            console.log("Database is connected")
        })
        .catch(err => {
            console.log("Error is ", err.message)
        })


// Passport middleware
app.use(passport.initialize())

//Config for JWT strategy
require("./strategies/jsonwtStrategy")(passport)


app.get('/', (req, res) =>{
     res.status(200).send('Hi welcome to the login and Signup API')
})
        


const userRouter = require('./routes/user')

app.use('/user', userRouter)



app.listen(port, ()=>{
    console.log('Server is satarted on port ${port}')
})