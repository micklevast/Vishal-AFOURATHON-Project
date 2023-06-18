//Schema for the Skills
const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const skillSchema=new Schema({
    skill_name:{
        type:String,
        required:true,
        unique:true,
    },
    domain:{
        type:String,
        required:true,
    }
});

module.exports=mongoose.model("Skills",skillSchema)