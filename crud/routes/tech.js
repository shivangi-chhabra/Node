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

router.get('/:id', async(req, res) => {
    try{

        const tech = await Tech.findById(req.params.id)
        res.json(tech)

    } catch {
        res.send('Error' + err)
    }
    
})

router.post('/', async(req, res) => {

    const tech = new Tech({
        name: req.body.name,
        tech: req.body.tech,
        sub: req.body.sub
    })
    try {
       const a1 = await tech.save()
       res.json(a1)
    } catch(err) {
       res.send('Error')
    }
})

router.patch('/:id', async(req, res) => {
    try{
        const tech = await Tech.findById(req.params.id)
        tech.sub   = req.body.sub
        const a1  = await tech.save()
        res.json(a1)

    }catch{
       res.send('Error')
    }
})

router.delete('/:id', async(req, res) => {
    try{
        const tech = await Tech.findById(req.params.id)
        tech.sub   = req.body.sub
        const a1  = await tech.remove()
        res.json(a1)

    }catch{
       res.send('Error')
    }
})

module.exports = router