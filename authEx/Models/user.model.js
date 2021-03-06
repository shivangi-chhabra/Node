const { Schema } = require('mongoose')
const mongoose = require('mongoose')
const schema   = mongoose.Schema

const bcrypt = require('bcrypt')

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

userSchema.pre('save', async function (next) {
    try {
        //console.log('before saving')
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
        next()
    } catch (error) {
        next(error)
    }
})

const tUser = mongoose.model('tuser', userSchema)
module.exports = tUser