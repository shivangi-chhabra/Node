const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()
const courseModel = mongoose.model("course")

router.get('/list', (req, res)=> {
       courseModel.find((err, docs) => {
            if (!err) {
                console.log(docs)
                res.send('Course Controller')   
            } else {
                res.send('Error')
            }
       })
})

module.exports = router 