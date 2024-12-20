const express = require("express");
const router = express.Router();
const mailer = require("../../mailer");
const crypto = require("crypto");
const userDB = require("../../databases/controllers/userDBConnector");

router.post("/signin", (req, res) => {
  console.log(crypto.createHash("sha256").update("qwqwqw").digest("hex"))
  console.log(req.body)
  if (req.body.email && req.body.password) {
    userDB.get(
      `SELECT * FROM users WHERE email = '${req.body.email}'`,
      (err, row) => {
        if (row) {
          if (
            row.password ==
            crypto.createHash("sha256").update(req.body.password).digest("hex")
          ) {
            res.cookie("cau" , row.id, {
              httpOnly: true,
              path: "/",
              maxAge: 3600000,
              expires: new Date(Date.now() + 3600000),
            } );

            res.sendStatus(200);
          }
          else{
            res.sendStatus(401)
          }
        } else {
          res.status(404).send("NO ACCOUNT");
        }
      }
    );
  }
  else res.status(403).send("MISSING CREDS")
});


module.exports = router