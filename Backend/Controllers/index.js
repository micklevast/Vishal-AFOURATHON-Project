const Employee = require("../Models/Employee");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const { restart } = require("nodemon");
const cookies = require("cookies");
//require Authentication
const requireAuth = (req, res, next) => {
  const token = req.body.cookie;

  // console.log(token);
  if (token) {
    // token = token.jwt;
    jwt.verify(token, process.env.Secrete_key, (err, decodedToken) => {
      if (err) {
        res.redirect("http://localhost:5173/auth/sign-in");
        // res.redirect("/");
      } else {
        // console.log(decodedToken);
        req.body.id = decodedToken.id;
        next();
      }
    });
  } else {
    console.log("Cookie not setted")
    res.json({"Success":false,"Message":req.cookie})

    //res.redirect("")
  }
};



module.exports = { requireAuth };
//controller for the post login

//
