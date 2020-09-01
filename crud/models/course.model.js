const mongoose = require('mongoose')

var courseSchema = mongoose.Schema({

    courseName : {
        type : String,
        required : "required"
    },
    courseId : {
        type : String
    },
    courseDueration : {
        type : String
    },
    courseFee : {
        type : String
    }
})