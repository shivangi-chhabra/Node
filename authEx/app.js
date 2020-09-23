const express = require('express')
const morgan  = require('morgan')
const createError = require('http-errors')
require('dotenv').config()

const app = express()

app.use(morgan('dev'))

const authRoute = require('./routes/auth.route')

app.get('/', async (req, res, next) => {
    res.send('Welcome!')
})

app.use('/auth', authRoute)

app.use(async (req, res, next) => {
    /*const error = new Error("not found")
    error.status = 404 
    next(error)*/
    next(createError.NotFound())
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('Hey your server has started')
})