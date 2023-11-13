import React ,{useState}from "react";
import { useDispatch } from "react-redux";
import { fetchStock } from "./Slices";
import axios from "axios";
const Modal=()=>{
    const initialState={medicine:'',quantity:'',price:'',expiry:''}
    const dispatch=useDispatch()
    const [stock,setStock]=useState(initialState)
    const handleTakeStock=(e)=>{
    const value= e.target.value
    const name= e.target.name
    setStock({...stock,[name]:value})
    }
     const handleAddToStock=()=>{
        const token=localStorage.getItem('token')
        const url ='http://127.0.0.1:8000/store/'
        axios.post(url,stock,{headers:{'Content-Type':"application/json",'Authorization':`Bearer ${token}`}})
        .then((res)=>{
            dispatch(fetchStock())
            console.log(res.data)
        })
        .catch((error)=>console.log(error))
        setStock(initialState)
     }
    return (
        <div className="modalWrapper">
            <div className="modalInputWrapper">
                <div className="input">
                <input value={stock.medicine} name='medicine' onChange={handleTakeStock} type='text' placeholder="Enter medicine"/><br/>
                <input value={stock.price} name='price' onChange={handleTakeStock} type='text ' placeholder="Enter price"/>
                </div>
                <div className="input">
                <input value={stock.quantity} name='quantity' onChange={handleTakeStock} type='text' placeholder="Enter quantity"/><br/>
                <input value={stock.expiry} name='expiry' onChange={handleTakeStock} type='date'/>
                </div>
            </div>
        <button onClick={ handleAddToStock}>Add Stock</button>
        </div>
    )
}
export default Modal