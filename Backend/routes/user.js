const router = require("express").Router();
const userDB = require("../databases/controllers/userDBConnector")

router.get("/getBasicInfo",(req,res)=>{
    userDB.get("SELECT * FROM users WHERE id = ?", [req.cookies.cau] , (err, results) => {
        if (err) {
            console.log(err);
        }
        else{
            res.json(results);
        }
    })
})

module.exports = router