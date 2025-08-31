const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;
const cookieParser = require('cookie-parser')
const app = express();
require('dotenv').config()

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended : true}))

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req, res, next) {
    try {
      const token = req.cookies?.token;
      if (!token) {
        return res.status(401).json({ message: "Token missing" });
      }
  
      const data = jwt.verify(token, process.env.JWT_KEY); 
      // console.log("JWT data:", data);
      // console.log(req.session);
      
      if (req.session?.authorization?.username && data.username === req.session.authorization.username) {
        console.log("User verified!");
        next(); 
      } else {
        return res.status(403).json({ message: "You are unauthorized" });
      }
  
    } catch (err) {
      console.error("Auth error:", err.message);
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  });
 


app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(process.env.PORT,()=>console.log(`http://localhost:${process.env.PORT}`));
