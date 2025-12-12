import mysql from 'mysql2/promise';
import { DB_CONFIG } from '../config.js';

let pool;

function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      ...DB_CONFIG,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
}

export async function findUserByEmail(email) {
  const db = getPool();
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [
    email,
  ]);
  return rows[0] || null;
}

export async function createUser(email) {
  const db = getPool();
  const [result] = await db.query('INSERT INTO users (email) VALUES (?)', [
    email,
  ]);
  return { id: result.insertId, email };
}
