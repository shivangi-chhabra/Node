const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/testDB', {useNewUrlParser:true}, (error)=>{
    if (!error){
        console.log('success!!!')
    } else {
        console.log('error while connecting with database')         
    }
})


const Course = require('./course.model')