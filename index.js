var express = require('express')
var http = require('http')
var fs = require('fs')

var app = express();
var server = http.createServer(app);

app.get('/', function(req, res) {
    res.send('<h1>Express works!</h1>')
})

app.get('/task', function(req, res) {
    fs.readFile('./db.json', function(err, data) {
        // to send only error otherwise you can write res.send(data.toString())
        var tasks = JSON.parse(data.toString()).tasks;
        res.json(tasks)  
    })
})

app.post
server.listen(3000, function() {

    console.log('Listening to the server port: 3000')

})