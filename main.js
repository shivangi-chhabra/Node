var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser') 
var bcrypt = require('bcrypt')
var passport = require('passport')
var jsonwt   = require('jsonwebtoken')
var db = require('./mysetup/myurl').myurl
var user = require('./models/user')
var key = require("./mysetup/myurl")

var saltRouds = 10


var app = express();

var port = process.env.PORT || 3000



app.use(bodyParser.urlencoded({ extended : false}));
app.use(bodyParser.json())


// Passport middleware
app.use(passport.initialize())

//Config for JWT strategy
require("./strategies/jsonwtStrategy")(passport)




mongoose.connect(db,{useNewUrlParser:true, useUnifiedTopology: true})
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
    var newUser = new user({
        username : req.body.username,
        email : req.body.email,
        password : req.body.password
    })
    /*await newUser.save()
             .then(()=>{
                 res.status(200).send(newUser)
             })*/
     await user.findOne({ username: newUser.username})
               .then(async profile => {
                   if (!profile) {
                       bcrypt.hash(newUser.password, saltRouds, async (err, hash) => {
                           if (err) {
                               console.log("Error is ", err.message)
                           } else {
                               newUser.password = hash
                               await newUser.save()
                               .then(() => {
                                   res.status(200).send(newUser)
                               })
                               .catch(err => {
                                   console.log("error is ", err.message)
                               })
                           }
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
    var newUser = {}
    newUser.username = req.body.username
    newUser.password = req.body.password

    await user.findOne({ username: newUser.username})
              .then(profile => {
                  if (!profile){
                    res.send("User not exist")
                  } else {
                      bcrypt.compare(newUser.password, profile.password,
                        async (err, result) => {
                            if (err) {
                                console.log("error is ", err.message)
                            } else if (result == true) {
                                // res.send("User authenticated")
                                const payload = {
                                    id: profile.id,
                                    username: profile.username
                                }
                                jsonwt.sign(
                                    payload,
                                    key.secret,
                                    { expiresIn: 360 },
                                    (err, token) => {
                                        res.json({
                                            success: true,
                                            token: "Bearer " + token
                                        })
                                    }
                                )
                            } else {
                              res.send("User Unauthorized Access")
                          }
                        }
                      )
                      
              
                  }
                  
              })
              .catch(err => {
                  console.log('Error is ', err.message)
              })
})

app.get(
    "/profile",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      console.log(req);
      res.json({
        id: req.user.id,
        username: req.user.username
      });
    }
  );


app.listen(port, ()=>{
    console.log('Server is satarted on port ${port}')
})