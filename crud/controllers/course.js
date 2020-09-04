const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()
const CourseModel = mongoose.model("course")

router.get("/add", (req, res) => {
    res.render('add-course')
})

router.post("/add", (req, res) => {

    var course = new CourseModel()
    course.courseName = req.body.courseName
    course.courseDueration = req.body.courseDueration
    course.courseFee = req.body.courseFee
    course.courseId   = req.body.courseId
    course.save((err, doc) =>{
        if (!err){

          // res.redirect("/course/list")
          res.json({message:"successful", statues:"OK"})

        } else {

           res.send("Error Ouccered")

        }
    })
   
})

router.get('/list', (req, res)=> {
       CourseModel.find((err, docs) => {
            if (!err) {
                res.render('list', { list : docs })  
            } else {
                res.send('Error')
            }
       })
})

module.exports = router 