const Skills=require("../../Models/Skills")
const express=require("express")
const Router=express.Router();



//API for the skills data

Router.get("/getSkills", (req,res)=>{

    Skills.find().then(data=>{
        res.json({"Success":true,data:data})
    }).catch(err=>
        res.json({"Success":false,message:message}))
})


//Form to add the skills

Router.post("/addSkill",async (req,res)=>{
        const {skill,domain}=req.body
        console.log(skill,domain)
        try{
            const data= await Skills.create({skill_name:skill,domain})
            res.json({"Success":true,data})  
            }catch(err)
            {
                console.log(err)
                res.json({"Success":false,message:err})

            }
      
   
})

// Form to update the skills
Router.post('/editSkill',(req,res)=>{
    const {skill_id,skill_name}=req.body;
    console.log(skill_id,skill_name)
    Skills
    .findById
    (skill_id)
    .then(data=>{
        data.skill_name=skill_name;
        data.save()
        .then(data=>{
            res.json({"Success":true,data,message:"Skill Updated Successfully"})
        })
        .catch(err=>{
            res.json({"Success":false,message:err})
        })
    })

})

// Form to delete the skills
Router.post('/deleteSkill',(req,res)=>{
    const {skill_id}=req.body;
    console.log("Delete skill !",skill_id)
    Skills.findByIdAndDelete(skill_id).then(data=>{
        res.json({"Success":true,data,message:"Skill Deleted Successfully"})
    }
    ).catch(err=>{
        res.json({"Success":false,message:err})
    })
    
});

// Form to delete selected skilss
Router.post('/deleteAllSkills',(req,res)=>{
    const {data}=req.body;
    console.log("Delete All skills !",data)
    Skills.deleteMany({_id:{$in:data}}).then(data=>{
        res.json({"Success":true,data,message:"Skills Deleted Successfully"})
    }
    ).catch(err=>{
        res.json({"Success":false,message:err})
    })
    
});

module.exports = Router;
