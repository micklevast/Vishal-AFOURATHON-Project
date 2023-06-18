import axios from "axios"
import { useNavigate } from "react-router-dom";


export async function fetchData(token,setData){
    //  console.log(token)
     await axios.post(`${import.meta.env.VITE_APP_API_URL
     }/employee/123`,
     {  
      cookie:token,
     },
     {  
     withCredentials:true 
      } // could also try 'same-origin'

     ).then(async (d)=>{
      // console.log(await d.data)
       setData(await d.data)
       return ""

     }).catch(e=>{
        return e
     })
    
    //  return data
  }