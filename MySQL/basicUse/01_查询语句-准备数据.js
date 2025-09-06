const mysql = require('mysql2');
 
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'rU^c*sM_SL1.ye',
  database: 'bilibili'
});

const statement = `INSERT INTO products SET ?;`
const phoneJson = require('./phone.json');

for (let phone of phoneJson) {
  connection.query(statement, phone);
}
