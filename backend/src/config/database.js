require('dotenv').config(); 

const mysql = require("mysql2/promise"); 

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306, 
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


pool.getConnection()
    .then(conn => {
        console.log('Conectado ao banco de dados com sucesso!');
        conn.release(); 
    })
    .catch(error => {
        console.error('Erro ao conectar ao banco de dados:', error.message);
    });

module.exports = pool;