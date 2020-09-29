const express = require('express')
const router = express.Router();
const fs = require('fs')
const msg = "unable to save"


router.post('/', async(req,res)=>{
    const work = {Subscriber_Email: req.body.Subscriber_Email}
    try{
        const data = work.Subscriber_Email
        fs.appendFile('./Output.txt', data, (err) => {  
            if (data){
                res.status(200)
            }
        }) 
    }catch(err){
            res.status(500).json({
              message:err+ msg
            })
    }
  })

  module.exports = router