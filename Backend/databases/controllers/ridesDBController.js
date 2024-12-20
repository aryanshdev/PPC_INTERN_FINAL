const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("./databases/rides.db");

db.run(`CREATE TABLE IF NOT EXISTS rides (
    rideID VARCHAR(100) Primary Key,
    userID VARCHAR(100) NOT NULL,
    partnerID VARCHAR(100) NOT NULL,
    source VARCHAR(100) NOT NULL,
    destination  VARCHAR(100) NOT NULL,
    status  VARCHAR(100) NOT NULL,
    start TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end TIMESTAMP,
    cost  VARCHAR(100) )`
);


module.exports = db