const express = require('express')
const router = express.Router()
const Tech   = require('../models/tech')

router.get('/', async(req, res) => {
    try{

        const tech = await Tech.find()
        res.json(tech)

    } catch {
        res.send('Error' + err)
    }
    
})

module.exports = router