const session = require("express-session");
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser');

// App Configs
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser())

// Routes
const userRoute = require("./routes/user");
const appRoute = require("./routes/app");
const { router: authRoute, ensureAuthenticated } = require("./routes/auth");

app.use(
  session({
    secret: process.env.SESSION_SECRET, // Replace with a secure secret
    resave: false,
    saveUninitialized: false,
    cookie: { 
      httpOnly: true,
      path: "/",
      maxAge: 3600000,
      expires: new Date(Date.now() + 3600000),
     }, // Use secure: true if using HTTPS
  })
);

app.use("/user", ensureAuthenticated, userRoute); // Protect user routes with ensureAuthenticated
app.use("/auth", authRoute); // Use the auth route directly
app.use("/app",ensureAuthenticated, appRoute);

app.listen(10000, () => {
  console.log("SERVER UP at 10000");
});
