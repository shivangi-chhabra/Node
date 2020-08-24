const express = require('express');
const { appendFile } = require('fs');

const newapp = express();

newapp.get('/',function (req, res){
    res.send('Hello World!')
})

newapp.get('/alien', function (req, res) {
    const id = req.query.id;
    res.send('Welcome Back ' + id)
})

newapp.get('/alien/:id', function(req, res) {
    const id = req.params.id
    res.send('Welcome Back shivangi ' + id)
})

newapp.listen(9000, function (req, res){
    console.log('Running....')
});
