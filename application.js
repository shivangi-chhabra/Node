const express = require('express')
const bodyParser = require('body-parser')

const App     = express();

// parser application/x-www-form-urlencoded 
App.use(bodyParser.urlencoded({ extended : false}))

//parse application/json
App.use(bodyParser.json())

// People > /people
// Person/Row >  /people/person
// Person/Row/Age > /people/person/age

let people = {people: [{name : "Shivangi"}]}

App.get("/people", function(req, res) {
    
    res.json(people)
    res.end()
})

App.post("/people", function(req, res) {
    if (req.body && req.body.name) {
       people.people.push({name : req.body.name})
    }
    console.log(req.body.name)
    res.json(people)
    res.end()
})

App.put("/people", function(req, res) {
    if (req.body && req.body.name) {
       people.people.push({name : req.body.name})
    }
    console.log(req.body.name)
    res.json(people)
    res.end()
})

App.delete("/people", function(req, res) {
    if (req.body && req.body.name) {
       people.people.push({name : req.body.name})
    }
    console.log(req.body.name)
    res.json(people)
    res.end()
})

App.get("/people/:name", function(req, res) {
    
    res.json({ name : req.params.name})
    res.end()
})

App.get("/people/:name/:age", function(req, res) {
    
    res.json({ name : req.params.name})
    res.end()
})

App.listen(3000)