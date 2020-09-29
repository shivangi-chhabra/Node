const express = require('express')
const morgan  = require('morgan')
const createError = require('http-errors')
require('dotenv').config()
require('./helpers/init_mongodb')
const email = require("./routes/email")



const app = express()

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method ==='OPTIONS') {
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({})
    }
    next();
})

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const authRoute = require('./routes/auth.route')

app.get('/', async (req, res, next) => {
    res.send('Welcome!')
})

app.use('/email', email)

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