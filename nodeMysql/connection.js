const mysql = require('mysql')

var mysqlConnection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "password",
    database : "test",
    multipleStatements : true
})

mysqlConnection.connect((err)=>{
    if(!err) {
       console.log("Connected!!")
    }
    else{
        
       console.log("Not Connected")
    }
})

module.exports = mysqlConnection