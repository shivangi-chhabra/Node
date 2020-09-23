const { Schema } = require('mongoose')
const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unqiue: true
    },
    password:{
        type: String,
        required: true
    }

})

const tUser = mongoose.model('tuser', userSchema)
module.exports = tUser