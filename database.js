import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

//A pool is a collection of connections to the database
//instead of creating a new connection for each query we have a pool to reuse
const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getNotes() {
  const result = await pool.query('SELECT * FROM notes');
  const rows = result[0];
  return rows;
}

export async function getNote(id) {
  const [result] = await pool.query(`SELECT * FROM notes WHERE id = ? `, [id]);
  return result[0];
}

export async function createNote(title, content) {
  const [result] = await pool.query(
    `
        INSERT INTO notes (title, contents) 
        VALUES(?, ?)
        `,
    [title, content]
  );
  return getNote(result.insertId);
}

// const result = await createNote('Im that guy', 'yooooo');
// console.log(result);
