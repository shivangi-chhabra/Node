const { mongo } = require('mongoose')
const mongoose = require('mongoose')

mongoose.connect( process.env.MONGODB_URI, {dbName: process.env.DB_NAME,
useUnifiedTopology: true,
useNewUrlParser: true,
useFindAndModify: false,
useCreateIndex: true })
.then(() => {
    console.log('mongodb connected')
})
.catch((err) => {
    console.log(err.message)
})

mongoose.connection.on('conneted', () => {
    console.log('momgoose got connected to database')
})

mongoose.connection.on('error', (err) => {
    console.log(err.message)
})

mongoose.connection.on('disconnected', () => {
    console.log('mongoose connection got disconnected.')
})

process.on('SIGINT', async () => {
    await mongoose.connection.close()
    process.exit(0)
})