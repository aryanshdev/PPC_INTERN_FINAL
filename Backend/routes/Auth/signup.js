const express = require("express");
const router = express.Router();
const mailer = require("../../mailer");
const crypto = require("crypto");
const userDB = require("../../databases/controllers/userDBConnector");
const addressDB = require("../../databases/controllers/addressDBConnector");
const ShortUniqueId = require("short-unique-id");
const idgen = new ShortUniqueId({ length: 12 });

const newAccountQuery = `INSERT INTO users (id,name, phonenum, email, password) 
VALUES (?, ?, ?, ?, ?)`;
const newAddressQuery = `INSERT INTO addresses (userid, addressName, address, city, state, country, pincode) 
VALUES (?, ?, ?, ?, ?, ?, ?)`;

router.post("/sendOTP", async (req, res) => {
  const email = req.body.userEmail;
  const otp = Math.round(Math.random() * 1000000);

  try {
    await mailer.sendMail({
      to: email,
      from: `Cab Service ${process.env.EMAIL}`,
      subject: "Cab Service | Verification OTP",
      text: "Your Verification OTP is " + otp,
    });

    req.session.otp = otp;
    req.session.save((err) => {
      if (err) {
        console.error("Error saving session:", err);
        res.status(500).send("Failed to save session.");
      } else {
        res.status(200).send("Session saved and OTP sent.");
      }
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).send("Failed to send OTP.");
  }
});

router.post("/verifyOTP", async (req, res) => {
  console.log(req.session)
  if (req.session.otp == req.body.enteredOTP) {
    res.send("Verified");
    req.session.otp = "verified";
    req.session.save();
  } else {
    res.status(401).send("Wrong OTP");
  }
});

router.post("/createAccount", async (req, res) => {
  console.log(req.body)
  if (req.session.otp === "verified") {
    uuid = idgen.rnd();
    userDB.run(
      newAccountQuery,
      [uuid,
        req.body.fullName,
      req.body.phoneNumber,
      req.body.email,
      crypto.createHash("sha256").update(req.body.password).digest("hex")]
    );
    addressDB.run(
      newAddressQuery,
      [uuid,
      req.body.addressName,
      req.body.address,
      req.body.city,
      req.body.state,
      req.body.country,
      req.body.pincode]
    );
    res.send("CREATED");
  } else {
    res.status(401).send("Wrong OTP");
  }
});
module.exports = router;
