const router = require("express").Router();
const mongoose = require("mongoose");

const Employee = require("../../Models/Employee");
const { requireAuth } = require("../../Controllers/index");

//Update the skill
router.post("/employee/addSkills",requireAuth, async (req, res) => {
  const id = req.body.id;
  const d = [...req.body.skills];
  
    const ans=await Employee.findByIdAndUpdate(id,{$set:{
        Skills:d
      }})
  if(ans)
  {
      res.json({ Success: true });
  } else {
    res.json({ Success: false, message: "Invalid Id" });
  }
});





router.post("/employee/:id", requireAuth, async (req, res) => {
  const id = req.body.id;

console.log(id)
  // const data = await Employee.findOne({ _id: id }).populate("Skills.skill_id").exec();
  const data=await Employee.aggregate([
    {
      $match:{_id:new mongoose.Types.ObjectId(id) }
    },
    
    {
      "$lookup": {
        "from": "skills",
        "localField": "Skills.skill_id",
        "foreignField": "_id",
        "as": "product"
      }
    },
    // console.log(product)
    {
      $project: {
        FirstName:"$FirstName",
        LastName:"$LastName",
        Gender:"$Gender",
        JoinDate:"$JoinDate",
        Department:"$Department",
        Location:"$Location",
        Position:"$Position",
        Email:"$Email",
        Password:"$Password",
        about:"$about",
        profile_photo:"$profile_photo",
        portfolio:"$portfolio",
        github:"$github",
        linkedIn:"$linkedIn",

        // Skills:"$product"
        Skills: {
          $map: {
            input: "$Skills",
            as: "item",
            in: {
              skill_id: {
                $arrayElemAt: [
                  {
                    $filter: {
                      input: "$product",
                      as: "prod",
                      cond: {
                        $eq: [
                          "$$prod._id",
                          "$$item.skill_id"
                        ]
                      }
                    }
                  },
                  0
                ]
              },
              quantity: "$$item.quantity",
              YOE: "$$item.YOE",
              level: "$$item.level"
            }
          }
        }
      }
    }
  ])
      
   
  console.log(data)  
  if (data) {
    res.json({ Success: true, data: data });
  } else res.json({ Success: false, message: "Invalid id" });
});


router.post("/employees/:id", requireAuth, async (req, res) => {
  const id = req.body.id;
  const data = await Employee.findOne({ _id: id })
  // populate the skills

      
  console.log(data);
  
  if (data) {
    res.json({ Success: true, data: data });
  } else res.json({ Success: false, message: "Invalid id" });
});


module.exports = router;
