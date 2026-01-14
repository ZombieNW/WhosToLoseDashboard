import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

const dbPath = path.resolve('db/app.db');
fs.mkdirSync('data', { recursive: true });

export const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    discord_id TEXT PRIMARY KEY,
    username TEXT,
    agrees INTEGER NOT NULL,
    submitted_at INTEGER
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    discord_id TEXT,
    title TEXT NOT NULL,
    story TEXT NOT NULL,
    submitted_at INTEGER,
    extra TEXT
  )
`);
