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

export async function getWatchlistByUserId(userId) {
  const db = getPool();
  const [rows] = await db.query(
    'SELECT symbol FROM user_watchlist WHERE user_id = ? ORDER BY created_at ASC',
    [userId],
  );
  return rows.map((r) => r.symbol);
}

export async function addSymbolToWatchlist(userId, symbol) {
  const db = getPool();
  await db.query(
    'INSERT IGNORE INTO user_watchlist (user_id, symbol) VALUES (?, ?)',
    [userId, symbol],
  );
}

export async function removeSymbolFromWatchlist(userId, symbol) {
  const db = getPool();
  await db.query(
    'DELETE FROM user_watchlist WHERE user_id = ? AND symbol = ?',
    [userId, symbol],
  );
}
