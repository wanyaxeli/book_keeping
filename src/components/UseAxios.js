import React,{useEffect,useState} from "react";
import axios from "axios";
const UseAxios=(configParams)=>{
    const[isLoading,setIsLoading]=useState(true)
    const[data,setData]=useState([])
    const[errors,setErrors]=useState([])
    useEffect(()=>{
      axiosCustomHook(configParams)
    },[])
    const axiosCustomHook =async ()=>{
     await axios.request(configParams)
     .then((res)=>{
        setData(res)
     })
     .catch((errors)=>setErrors(errors))
     .finally(()=>setErrors(false))
    }
    return [data,isLoading,errors]
}
export default UseAxios