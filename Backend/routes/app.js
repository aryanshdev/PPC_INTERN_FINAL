const express = require("express");
const router = express.Router();
const cabRoute = require("./cab")
const rideRoute = require("./rides")

router.use("/cabs", cabRoute)
router.use("/rides", rideRoute)

module.exports = router