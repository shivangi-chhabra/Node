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
    /*await newUser.save()
             .then(()=>{
                 res.status(200).send(newUser)
             })*/
     await User.findOne({ username: newUser.username})
               .then(async profile => {
                   if (!profile) {
                       await newUser.save()
                                    .then(() => {
                                        res.status(200).send(newUser)
                                    })
                                    .catch(err => {
                                        console.log("error is ", err.message)
                                    })
                   } else {
                       res.send("User already exists...")
                   }
               })        
             .catch(err => {
                 console.log("Error is ", err.message)
             })
})


app.post("/login", async (req, res) => {
    var newUser = {};
    newUser.username = req.body.username,
    newUser.password = req.body.password

    await User.findOne({ username: newUser.username})
              .then(profile => {
                  if (!profile){
                    res.send("User not exist")
                  } else {
                      if (profile.password == newUser.password){
                          res.send("User authenticated")
                      } else {
                          res.send("User Unauthorized")
                      }
                  }
                  
              })
              .catch(err => {
                  console.log('Error is ', err.message)
              })
})


app.listen(port, ()=>{
    console.log('Server is satarted on port ${port}')
})