const router = require("express").Router();
const mongoose = require("mongoose");
const Employee = require("../../Models/Employee");
const { requireAuth } = require("../../Controllers/index");
//API for the employee data
router.post("/getEmployee",async (req, res) => {
  let {gender,location,department,position}=req.body
  if(department==='All' || department==='') 
      department=' *'
  if(location==='All' || location==='')
    location=" *"
  if(position==='All' || position==='')
    position=" *"

  if(gender==='All' || gender==='')
    gender=" *"
  const data=await Employee.aggregate([
    {
      $match:{
      $and:[{Department:{ $regex: department} },{Position:{ $regex: position} },{Location:{ $regex: location} },{Gender:{ $regex: gender} }]
      }
    },
    {
      "$lookup": {
        "from": "skills",
        "localField": "Skills.skill_id",
        "foreignField": "_id",
        "as": "product"
      }
    },
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
      
  if(data) {
      res.json({ Success: true, data: data });
    }
  else res.json({ Success: false, message: err });
});



module.exports = router;
