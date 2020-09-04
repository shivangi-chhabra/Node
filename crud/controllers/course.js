const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()
const CourseModel = mongoose.model("course")

router.get('/list', (req, res)=> {
       CourseModel.find({},(err, docs) => {
            if (!err) {
                res.render('list', { data : docs })  
            } else {
                res.send('Error')
            }
       })
})

module.exports = router 