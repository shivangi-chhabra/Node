const express = require('express')
const router  = express.Router()

router.post('/register', (req, res, next) => {
    res.send('you are on register')
})

router.post('/login', (req, res, next) => {
    res.send('you are on Login')
})

router.post('/refresh-token', (req, res, next) => {
    res.send('you are on refresh token')
})

router.delete('/logout', (req, res, next) => {
    res.send('you are on Logout')
})






module.exports = router