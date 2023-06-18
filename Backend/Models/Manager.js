//Schema for the Manager
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ManagerSchema = new Schema({
  id:{
    type:Schema.Types.ObjectId,
    ref:"Employee"
  }
});

module.exports = mongoose.model("Manager", ManagerSchema);

