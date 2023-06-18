//Schema for the Employee
const mongoose=require("mongoose")
const Schema=mongoose.Schema;
const {isEmail}=require("validator")
const bcrypt=require("bcrypt")
const EmployeeSchema=new Schema({
    FirstName:{
        type:String,
        required:true,
    },
    LastName:{
        type:String,
        required:true,
    },
    Gender:{
        type:String,
        required:true,
    },
    JoinDate:{
        type:Date,
        required:true,
    },
    Location:{
        type:String,
        required:true,

    },
    Department:{
        type:String,
        required:true,
    },
    Position:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        unique:true,
        required:[true,"Email can't be empty"],
        validate:[isEmail,"Enter valid email"]
    },
    
    Password:{
        type:String,
        required:true,
        minLength:[6,"Min length of the password is 6 characters"]
    },
    Skills:[{
        skill_id:{
            type:Schema.Types.ObjectId,
            ref:"Skills",
        },
        level:{
            type:String,
            required:true
        },
        YOE:{
            type:Number,
            required:true
        },
        
    }],
    about:{
        type:String
    },
    profile_photo:{
        type:String
    },
    portfolio:{
        type:String
    },
    github:{
        type:String
    },
    linkedIn:{
        type:String
    },


});


//Encrypt the password
EmployeeSchema.pre('save',async function(next){
    // console.log(this)
    const salt=await bcrypt.genSalt();
    this.Password=await bcrypt.hash(this.Password,salt);
    // console.log(this.Password)
    next();
})


//Checking the login
EmployeeSchema.statics.login=async function(email,password){
    const auth=await this.findOne({Email:email})
    if(auth)
    {
        const dd=await bcrypt.compare(password,auth.Password)
        
        if(dd) {
            // console.log(auth)
            return auth
        }
        throw Error("Incorrect password ");
    }
    throw Error("Incorrecet email");
}

module.exports=mongoose.model("Employee",EmployeeSchema)