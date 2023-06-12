import axios from "axios";
import React ,{useEffect,useState}from "react";
const Sales=()=>{
    const [data,setData]=useState([])
   useEffect(()=>{
    const token=localStorage.getItem('token')
    const endpoint='http://127.0.0.1:8000/sales/'
   axios.get(endpoint,{headers:{'Authorization':`Bearer ${token}`}})
   .then((res)=>{
   const fetch = res.data.map(item=>{
         const{id,date,items,total}=item
         const parsedItems=JSON.parse(items)
         const fetchedObject={id:id,date:date,items:parsedItems,total:total}
         return fetchedObject
     })
    setData(fetch)
   })
   .catch((error)=>{
   console.log(error)
   })
   },[]) 
   
    return(
        <div className="salesWrapper">
         {data.map(item=>{
            return (
            <div className="salesContainer" key={item.id}>
            <div className="salesHeaderWrapper">
             <h3>{item.date} </h3>
            </div>
            <div className="salesTableHeader">
            <table>
                <thead>
                    <tr>
                        <th>Medicine</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {item.items.map((item,i)=>{
                        return(
                        <tr key={i}>
                            <td>{item.medicine}</td>
                            <td>{item.price}</td>
                            <td>{item.quantity}</td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="salesTotalWrapper">
                <p className="totalSalesContainer">Total sales {item.total}</p>
            </div>
            </div>
            </div>
            )
         })}
        </div>
    )
}
export default Sales