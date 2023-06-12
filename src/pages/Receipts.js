import { useNavigate } from "react-router-dom";
import React,{useState} from "react";
import axios from "axios";
const Receipts=()=>{
    const navigate=useNavigate()
    const initialState={date:'',amount:'',image:''}
    const [values,setValue]=useState(initialState)
    const handleViewImage=()=>{
    navigate('/imageView')
    }
    const handleChange=(e)=>{
        const value= e.target.value
        const name= e.target.name
        setValue({...values,[name]:value})
    }
    const handleSubmit=(e)=>{
    e.preventDefault()
    const token=localStorage.getItem('token')
    const endpoint='http://127.0.0.1:8000/receipts/'
    axios.post(endpoint,values,{headers:{
        'Authorization':`Bearer ${token}`,
        'Content-Type':'multipart/form-data'
    }})
    }
    return(
        <div className="receiptsWrapper">
          <h3>January</h3>
          <ul>
            <li onClick={handleViewImage}>
                <p>date</p>
                <p>amount</p>
            </li>
          </ul>
          <div className="expiryWrapper">
            <div className="expiryInputs">
            <input name="date" onChange={handleChange} type='date' placeholder='Enter amount'/>
            <input name="amount" onChange={handleChange} type='text' placeholder='Enter amount'/>
            <input name="image" onChange={handleChange} accept=".jpg,.png .jpeg" type='file' placeholder='Enter amount'/>
            </div>
            <div className="receiptsTotolWrapper">
                <p>Total</p>
                <p>200</p>
            </div>
            <div>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
    )
}
export default Receipts