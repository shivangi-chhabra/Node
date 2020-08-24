var fs = require('fs')

fs.readFile('calc.js', 'utf8', function(err, data){
     console.log(data)
})

fs.writeFile('calc1.js','console.log("done")', function(err){
    console.log("Data Saved")
})

fs.appendFile('calc.js','console.log("done")', function(err){
    console.log("Data Saved")
})

fs.unlink('calc.js', function(err){
    console.log('Delected')
})