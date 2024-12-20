const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database("./databases/addresses.db")

db.run(`CREATE TABLE IF NOT EXISTS addresses (
    userid VARCHAR(12)  NOT NULL,            -- Unique ID for each user
    addressName VARCHAR(100),
    address TEXT,                           -- Address (supports long text)
    city VARCHAR(100),                      -- City name
    state VARCHAR(100),                     -- State name
    country VARCHAR(100),                   -- Country name
    pincode VARCHAR(10)  
    );
`)

module.exports = db