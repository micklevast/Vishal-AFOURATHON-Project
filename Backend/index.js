//Basic Express setup
const express = require("express");
const app = express();

//url encoded string ---middleware---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Mongoose connection
const mongoose = require("mongoose");

//Environment setup
const dotenv = require("dotenv").config();
const router = require("./Routes/Apis/Skills");

// Used to allow the react to access the backend API.
const cors = require("cors");
const { urlencoded } = require("express");
const MyRoutes = require("./Routes");

//token authentication
const corsOptions = {
  origin: true,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(function (req, res, next) {
  res.header("Content-Type", "application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  // res.header("Access-Control-Allow-Methods", "*")
  // res.setHeader("Access-Control-Allow-Origin", "*");


  next();
});

app.use("/api", router);
app.use(MyRoutes);
//Handling the '/' URL
app.use("/", (req, res) => {
  res.send("<h1>Hello to the world!!!</h1>");
});

mongoose.set("strictQuery", false);
//MongoDb connection
mongoose.connect(process.env.URI).then((result) => {
  //Listen to server
  app.listen(process.env.PORT, () => {
    console.log(
      `Server conected to DB & Started on http://localhost:${process.env.PORT}/`
    );
  });
});
