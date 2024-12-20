const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database("./databases/cabs.db")

db.run(`CREATE TABLE IF NOT EXISTS cabs (
    carRegNum VARCHAR(12) PRIMARY KEY,           
    carType VARCHAR(100),
    carModel TEXT,                         
    locationCurrent VARCHAR(100),                       
    city VARCHAR(100),   
    cabAvail INTEGER,                    
    country VARCHAR(100)
);

`)


module.exports = db