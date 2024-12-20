const express = require("express");
const router = express.Router();
const cabDB = require("../databases/controllers/cabDBConnector");
const ridesDB = require("../databases/controllers/ridesDBController");
const partnerDB = require("../databases/controllers/partnersDBController");
const ShortUniqueId = require("short-unique-id");
const idgen = new ShortUniqueId({ length: 12 });
const createRideQuery = `
INSERT INTO rides 
(rideID, userID, partnerID, source, destination, status, cost) 
VALUES (?, ?, ?, ?, ?, ?, ?)
`;
// end points
router.post("/getAvailableCabs", (req, res) => {
  const query = `SELECT * FROM cabs WHERE LOWER(locationCurrent) = LOWER(?) AND cabAvail = 1`;
  cabDB.all(query, [req.body.from.trim().toLowerCase()], (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    res.json(rows);
  });
});

router.post("/bookCab", (req, res) => {
  const { selectedCabNum, from, to } = req.body;

  if (!selectedCabNum || !from || !to) {
    return res.status(400).send("Missing required fields");
  }

  // Fetch partnerID from the PartnerDB using cabNum
  partnerDB.get(
    `SELECT partnerID FROM partners WHERE carNum = ?`,
    [selectedCabNum],
    (err, row) => {
      if (err) {
        console.error("Error fetching partnerID:", err.message);
        return res.sendStatus(500);
      }

      if (!row) {
        return res.status(404).send("Cab not found");
      }

      const partnerID = row.partnerID;

      try {
        // Update the cab's status to '0' (unavailable)
        cabDB.run(
          `UPDATE cabs SET cabAvail = 0 WHERE carRegNum = ?`,
          [selectedCabNum],
          (updateErr) => {
            if (updateErr) {
              console.error("Error updating cab status:", updateErr.message);
              return res.sendStatus(500);
            }

            // Create a new ride
            const rideUUID = idgen.rnd();
            ridesDB.run(
             createRideQuery,
              [rideUUID, req.cookies.cau, partnerID, from, to, "start", 200],
              (rideErr) => {
                if (rideErr) {
                  console.error("Error creating ride:", rideErr.message);
                  return res.sendStatus(500);
                }

                // Respond with the trip ID
                res.cookie("ari", rideUUID,{
                  httpOnly: true,
                  path: "/",
                  maxAge: 36000000,
                  expires: new Date(Date.now() + 3600000),
                } ).send("OK");
              }
            );
          }
        );
      } catch (error) {
        console.error("Unexpected error:", error);
        res.sendStatus(500);
      }
    }
  );
});

module.exports = router;
