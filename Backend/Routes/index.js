//Routes of the app
const cookieParser = require("cookie-parser");
const Employee = require("../Models/Employee");
const manager = require("./Apis/Manager");
const emp = require("./Apis/Employee");
const skill = require("./Apis/Skills");
const {
  handleSignup,
  handleLogin,
  logout,
  handleEdit,
} = require("../Controllers/Auth/auth");
const express = require("express");
const { application } = require("express");
const router = express.Router();
router.post("/edit", handleEdit);

router.post("/signup", handleSignup);

router.post("/login", handleLogin);


// app.post("/api/logout", verifyJWT, (req, res) => {
//     // Send a successful response to the client
//     res.send({ success: true });
//   });

const verifyJWT = (req, res, next) => {
  const token = req.cookies["jwt"];
  if (!token) {
    return res.status(401).send({
      message: "No token provided.",
    });
  }

  jwt.verify(token, process.env.Secrete_key, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Invalid token.",
      });
    }
    req.userId = decoded.id;
    next();
  });
};
router.get("/logout", logout);

router.use(manager);
router.use(emp);
router.use(skill);
module.exports = router;
