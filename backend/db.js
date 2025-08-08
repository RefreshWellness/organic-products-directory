const Database = require('better-sqlite3');
const db = new Database('data.sqlite');

function init(){
  db.prepare(`CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    is_admin INTEGER DEFAULT 0,
    reset_token TEXT,
    reset_expires INTEGER
  )`).run();

  db.prepare(`CREATE TABLE IF NOT EXISTS categories (
    id TEXT PRIMARY KEY,
    name TEXT UNIQUE
  )`).run();

  db.prepare(`CREATE TABLE IF NOT EXISTS submissions (
    id TEXT PRIMARY KEY,
    url TEXT,
    title TEXT,
    description TEXT,
    tags TEXT,
    company TEXT,
    category_id TEXT,
    user_id TEXT,
    approved INTEGER DEFAULT 0,
    created_at INTEGER
  )`).run();

  // add a default admin if none exist (password: adminpass)
  const row = db.prepare('SELECT COUNT(*) as c FROM users WHERE is_admin=1').get();
  if(row.c === 0){
    const bcrypt = require('bcrypt');
    const { v4: uuidv4 } = require('uuid');
    const hash = bcrypt.hashSync('adminpass', 10);
    db.prepare('INSERT INTO users (id,name,email,password,is_admin) VALUES (?,?,?,?,1)')
      .run(uuidv4(),'Admin','admin@example.com',hash);
    console.log('Default admin created: admin@example.com / adminpass');
  }
}

init();
module.exports = db;
