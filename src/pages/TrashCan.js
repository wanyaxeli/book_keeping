import axios from "axios";
import React,{useState,useEffect} from "react";
const TrashCan=()=>{
    const [data,setData]=useState([])
    useEffect(()=>{
        const token=localStorage.getItem('token')
        const endpoint='http://127.0.0.1:8000/expired/'
     try{
        axios.get(endpoint,{headers:{'Authorization':`Bearer ${token}`}})
        .then(res=>{
            setData([res.data])
        })
     }
     catch(error){
      console.log(error)
     }
    },[])
    const flatData=data.flat()
    const handleEmptyBin=(id)=>{
    console.log(id)
    }
    return(
        <div className="canWrapper">
            <h3>Your Expired Drugs</h3>
            {flatData==='undefined'?<span>loading ...</span>:
            flatData.map(item=>{
                return(
                <table key={item.id}>
                <thead>
                    <tr>
                        <th>medicine</th>
                        <th>expiry</th>
                        <th>quantity</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{item.medicine}</td>
                        <td>{item.expiry}</td>
                        <td>{item.quantity}</td>
                        <td><button onClick={()=>handleEmptyBin(item.id)}>empty bin</button></td>
                    </tr>
                </tbody>
            </table>
                )
            })}
        </div>
    )
}
export default TrashCan