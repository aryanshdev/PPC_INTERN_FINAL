const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database("./databases/user.db")

db.run(`CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(12)  PRIMARY KEY,            -- Unique ID for each user
    name VARCHAR(100) NOT NULL,
    profilePhoto VARCHAR(100) DEFAULT "https://img.icons8.com/ios-filled/50/user.png" ,
    phonenum VARCHAR(15) NOT NULL,          -- Phone number, assuming max 15 characters (international format)
    email VARCHAR(255) NOT NULL UNIQUE,     -- Email with a unique constraint
    password VARCHAR(255) NOT NULL,         -- Password (hashed for security)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Record creation timestamp
    );
`)

module.exports = db