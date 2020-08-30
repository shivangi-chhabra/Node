

var http = require('http')
var events = require('events')
var url = require('url')

var eventEmitter = new events.EventEmitter();


var server = http.createServer(function(req, res) {
    eventEmitter.emit('someone requested', 'TEST') // event emit
    // setting content header
    res.writeHead(200, ('Content-Type','text/html'))
    var q = url.parse(req.url, true).query
    var txt = q.year + " " + q.month
    //send string to response
    res.end(txt)
})

eventEmitter.on('someone requested', function (data) {
    console.log('A request has been done on the server!', data)
}) // Event Listener

server.listen(3000, 'localhost', function() {
    console.log('Server started on port : 3000')
})

