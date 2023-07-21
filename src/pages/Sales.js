import axios from "axios";
import React ,{useEffect,useState}from "react";
const Sales=()=>{
    const [data,setData]=useState([])
    const[items,setItems]=useState([])
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
    
    useEffect(()=>{
        data.map(({date,id,items,total})=>{
            setItems ([items.flat()])
        })
    },[data])
    const flatItems=items.flat()
    return(
        <div className="salesWrapper">
         {data.map(({date,id,items,total})=>{
            return (
            <div className="salesContainer" key={id}>
            <div className="salesHeaderWrapper">
             <h3>{date} </h3>
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
                    {flatItems.map((item,i)=>{
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
                <p className="totalSalesContainer">Total sales {total}</p>
            </div>
            </div>
            </div>
            )
         })}
        </div>
    )
}
export default Sales