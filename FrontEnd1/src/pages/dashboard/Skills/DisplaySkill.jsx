const DisplaySkill=({ele,idx,domain,handleToggle,dom,setData,setchunks,chunks,data})=>{
    return (
    <div key={idx} id={ele._id+`flex`} className ={`flex flex-wrap hover:-mt-1 hover:-mb-2 hover:drop-shadow-2xl ease-in transition-all duration-400  mx-4 mb-3 justify-center items-center  shadow-xl
    rounded-br-xl rounded-tl-xl w-[14rem] md:w-[11rem] h-[7.5rem] flex-col ${ele.checked?"bg-blue-600 text-white":"bg-teal-200 text-black"} ${domain!==dom?"hidden":""}` } >

    <input name={ele._id}  type="checkbox" id={ele._id+'checkbox'}  className="hidden" onChange={e=>handleToggle(ele._id,idx,dom,setData,setchunks,chunks,data,domain)}></input>
    <label htmlFor={ele._id+'checkbox'} className="text-xl" >{ele.skill_name}</label>
    <div className={`grid grid-cols-1  justify-center  ${ele.checked?"":"hidden"}`} id={ele._id+`grid`}>
        <div className="flex justify-center">
          <label htmlFor={ele._id+'select'} className="pl-2">level:</label>
          <select id={ele._id+'select'} onChange={e=>handleToggle(ele._id,idx,dom,setData,setchunks,chunks,data,domain)} className="py-1 bg-transparent mb-2 mx-3 lg:mb-0 rounded-lg focus:outline-blue-600" value={`${ele.checked?ele.level:'Beginner'}`}>
            <option className="text-black">Beginner</option>
            <option className="text-black">Intermediate</option>
            <option className="text-black">Expert</option>
          </select>
        </div>
        <div className="flex justify-center space-x-3">
          <label htmlFor={ele._id+'number'} className="">Exp: </label>
          <input onChange={e=>handleToggle(ele._id,idx,dom,setData,setchunks,chunks,data,domain)} id={ele._id+'number'}  
          type="number" className="w-1/2 text-center bg-transparent rounded-lg focus:outline-blue-600" placeholder="Year of experience" name="exp"
          value={`${ele.checked?ele.YOE:0}`}
          
          ></input>

        </div>
      
      
     

  </div>
    </div>)
}

export default DisplaySkill