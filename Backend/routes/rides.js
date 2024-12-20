const router = require("express").Router();
const userDB = require("../databases/controllers/userDBConnector");
const ridesDB = require("../databases/controllers/ridesDBController");
const partnersDB = require("../databases/controllers/partnersDBController");
const cabsDB = require("../databases/controllers/cabDBConnector");

router.get("/getRideDetails", (req, res) => {

  ridesDB.get(
    "SELECT * FROM rides WHERE rideId = ?",
    [req.cookies.ari],
    (err, rideData) => {
      if (err) {
        console.log(err);
      } else {
        partnersDB.get(
          "SELECT * FROM partners WHERE partnerID = ? ",
          [rideData.partnerID],
          (err, partnerData) => {
            if (err) {
              console.log(err);
            } else {
              cabsDB.get("SELECT * FROM cabs WHERE carRegNum = ? ", [
                partnerData.carNum,
              ],  (err, cabData) => {
                if (err) {
                    console.log(err);
                }
                else{
                    res.json({rideData, partnerData, cabData});
                }
            })
            }
          }
        );
      }
    }
  );
});

module.exports = router;
