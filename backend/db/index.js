const mysql = require('mysql');
// const dotenv = require('dotenv');
// dotenv.config();

//[For your action]: Change "user" and "password" to your local MySQL Workbench Connection 
const conn = mysql.createConnection ({
    host: "localhost",
    user: "root",
    password: "********",
    database: "db_moneyapp",
    multipleStatements: true,
    // connectionLimit: 10,
});

// console.log(process.env);

// var conn = mysql.createConnection ({
//     host: process.env.DBHOST,
//     user: process.env.DBUSER,
//     password: process.env.DBPASSWD,
//     database: process.env.DBNAME,
//     multipleStatements: true,
// });

// conn.getConnection((err, connection) => {
//     if(err){
//         console.log(err);
//     }
//     console.log("Database connected successfully");
//     connection.release();
// });



conn.connect();

console.log("Successfully connect to MySQL database");


module.exports = conn;

