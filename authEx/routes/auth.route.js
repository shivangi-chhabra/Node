const express = require('express')
const router  = express.Router()
const createError = require('http-errors')
const tUser = require('../Models/user.model')

const {authSchema}  = require('../helpers/validation_schema')

router.post('/register', async (req, res, next) => {
    console.log(req.body)
    try { 
        //const {email, password} = req.body
        //if(!email || !password) throw createError.BadRequest()
  
        const result = await authSchema.validateAsync(req.body)
        console.log(result)

        const doesExist = await tUser.findOne({email: result.email})
        if(doesExist) throw createError.Conflict('${ result.email } is already taken')

        const user =  new tUser(result)
        const savedUser = await user.save()

        res.send(savedUser)

        
    } catch (error) {
        if (error.isJoi === true) error.status = 422 
        next(error)
    }
})

router.post('/login', async (req, res, next) => {
    res.send('you are on Login')
})

router.post('/refresh-token', async (req, res, next) => {
    res.send('you are on refresh token')
})

router.delete('/logout', async  (req, res, next) => {
    res.send('you are on Logout')
})






module.exports = router