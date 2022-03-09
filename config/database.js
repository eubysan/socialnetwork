const mysql = require('mysql2');
const { dbHost, dbPort, dbUser, dbPass, dbName } = require('.');

const connection = mysql.createConnection({
  host: dbHost,
  port: dbPort,
  user: dbUser,
  password: dbPass,
  database: dbName,
});

// Encapsulando con promesas:
function query(sql, data) {
  return new Promise((resolve, reject) => {
    connection.query(sql, data, function (error, result) {
      //Error first callback
      if (error) {
        if(error.errno === 1062){
          const errorData = error.sqlMessage.split("'")
          const value = errorData[1]
          const field = errorData[3].split(".")[1].split("_")[0]

          const message = `El ${field} '${value}' ya esta en uso`
          reject(message)
        }
        reject(error.sqlMessage);
      } else {
        resolve(result);
      }
    });
  });
}

async function insert(tableName, data) {
  try {
    const result = await query(`INSERT INTO ${tableName}(??) VALUES(?)`, [
      Object.keys(data),
      Object.values(data),
    ]);
    return {success: true, id: result.insertId}
  } catch (error) {
    return { error, success: false };
  }
}

// Exportamos un objeto
module.exports = { query, insert };
