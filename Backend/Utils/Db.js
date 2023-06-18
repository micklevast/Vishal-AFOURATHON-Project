//Handle the Database connection
const mongoose = require("mongoose");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};
const url = "";

const connection = mongoose.connect(url, options);
export default connection;