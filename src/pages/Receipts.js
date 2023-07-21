import { useNavigate } from "react-router-dom";
import React,{useEffect, useState} from "react";
import axios from "axios";
const Receipts=()=>{
    const navigate=useNavigate()
    const initialState={dateReceived:'',amount:'',image:''}
    const [values,setValue]=useState(initialState)
    const [data,setData]=useState([])
    const [amount,setAmount]=useState([])
    const [totalAmount,setTotalAmount]=useState('')
    const handleViewImage=(image)=>{
    navigate('/imageView',{state:image})
    }
    const handleChange=(e)=>{
        const {type,name,value}= e.target
        if (type ==='file'){
            setValue({...values,[name]:e.target.files[0]})
        }else{
            setValue({...values,[name]:value})
        }
       
    }
    const handleSubmit=(e)=>{
    e.preventDefault()
    const token=localStorage.getItem('token')
    const endpoint='http://127.0.0.1:8000/receipts/'
    axios.post(endpoint,values,{headers:{
        'Authorization':`Bearer ${token}`,
        'Content-Type':'multipart/form-data'
    }})
    .then(res=>{
        console.log(res.data)
        window.location.reload(true)
    })
    .catch(error=>{
        console.log(error)
    })
    }
    useEffect(()=>{
        const token=localStorage.getItem('token')
        const endpoint='http://127.0.0.1:8000/receipts/'
        try{
            axios.get(endpoint,{headers:{
                'Authorization':`Bearer ${token}`
            }})
            .then(res=>setData(res.data))
        }
        catch(error){
            console.log(error)
        }
       
    },[])
    useEffect(()=>{
        const amount= data.map(item=>(item.amount))
        setAmount(amount)
        getTotalAmount()
    },[data])
    function getTotalAmount(){
        let total=amount.reduce((accu,cur)=>{
         return accu + cur
        },0)
        setTotalAmount (total)
    }
    useEffect(()=>{
       const amount= data.map(item=>(item.amount))
       setAmount(amount)
       getTotalAmount()
    },[])
    return(
        <div className="receiptsWrapper">
          <h3>January</h3>
           {
            data.map(item=>{
                return(
                    <ul key={item.id}>
                    <li onClick={()=>handleViewImage(item.image)}>
                        <p>{item.dateReceived}</p>
                        <span>View receipt</span>
                        <p>{item.amount}</p>
                    </li>
                  </ul>
                )
            })
           }
          <div className="expiryWrapper">
          <div className="receiptsTotolWrapper">
                <p>Total</p>
                <p>{totalAmount}</p>
            </div>
            <div className="expiryInputs">
            <input name="dateReceived" onChange={handleChange} type='date' placeholder='Enter amount'/>
            <input name="amount" onChange={handleChange} type='text' placeholder='Enter amount'/>
            <input name="image" onChange={handleChange} accept=".jpg,.png .jpeg" type='file' placeholder='Enter amount'/>
            </div>
            <div>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
    )
}
export default Receipts