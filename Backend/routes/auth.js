const router = require('express').Router();
const signupRouter = require("./Auth/signup")
const signinRouter = require("./Auth/signin")

router.use("/signup", signupRouter)
router.use("/signin", signinRouter)

function ensureAuthenticated(req,res,next){

 if(req.cookies.cau){next()}
 else{
    res.status(401).send("UNAUTH")
 }
}

module.exports = { router, ensureAuthenticated };