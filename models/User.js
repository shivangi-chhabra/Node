// models/User.js

var mongoose = require('mongoose')
const UserSchema = mongoose.Schema({
    username: {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    }
})

module.exports = user = mongoose.model('UserSchema', UserSchema)