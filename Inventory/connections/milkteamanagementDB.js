const mysql = require("mysql2");


try{
const conn = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "milkteamanagement_db"
})

conn.getConnection((err)=> err ? console.log("Connection Error!", err) : console.log("Connected!"));

module.exports = conn;


}catch(error)
{
    console.log(error.message);
}




