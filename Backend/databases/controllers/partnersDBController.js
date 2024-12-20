const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("./databases/partners.db");
db.run(`CREATE TABLE IF NOT EXISTS partners (
    partnerID VARCHAR(100) NOT NULL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age  VARCHAR(100) NOT NULL,
    carNum VARCHAR(100) NOT NULL,
    licenseNumber  VARCHAR(100) NOT NULL UNIQUE,
    rating DECIMAL,
    reviewsRecieved INT,
    tripsCompleted INT
)`
);


module.exports = db