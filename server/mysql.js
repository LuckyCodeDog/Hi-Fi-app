const mysql = require('mysql')

const connection=mysql.createConnection({
    host:"nomad00.cgtlh4qrzuts.ap-southeast-2.rds.amazonaws.com",
    user:"admin",
    password:"123nomadnodes",
    database:"nomadnodes"
})

const sqlFn= function(sql,arr,callback){
    connection.query(sql,arr,callback   )
}

module.exports = sqlFn