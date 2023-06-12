import axios from "axios";
import React,{useState,useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { addToSale,reduceQuantity } from "../components/Slices";
const Home =()=>{
    const initialState={medicine:'',price:'',quantity:''}
    const date =new Date().toDateString()
    // const [sales,setSales]=useState([])
     const [daysales,setDaySales]=useState([])
     const[getValueSync,setGetValueSync]=useState([])
    // localStorage.setItem('sales',JSON.stringify(daysales))
    const [sale,setSale]=useState(initialState)
    const [totalprice,setTotalPrice]=useState(0)
    const [dates,setDates]=useState('')
    const dispatch = useDispatch()
    const state= useSelector((state)=>state.sales)
    const handleChange=(e)=>{
        const value=e.target.value
        const name=e.target.name
        setSale({...sale,[name]:value})
    }
    const handleAdd=()=>{
    //   const id = Math.floor(Math.random() * 100)
    //   const value = Object.assign({},sale,{id})
    //   dispatch(addToSale(value))
      setDaySales(pre=>[...pre,sale])
      getTotalPrice()
      setSale(initialState)
     const name = sale.medicine
      
      console.log(name)
    dispatch(reduceQuantity(name))
    }
    function getTotalPrice () {
   
    const price= daysales.reduce((accu,cur)=>{
        return accu + (cur.price * cur.quantity)
     },0)
     setTotalPrice(price)
    }
    function getDay(){
        setDates(date)
    }
    useEffect(()=>{
    getTotalPrice()
    },[daysales])
    const handleCloseBook=()=>{
        const token=localStorage.getItem("token")
        const stringifiedData=JSON.stringify(daysales)

        const sales = {date:date,items:stringifiedData,total:totalprice}
        const endpoint='http://127.0.0.1:8000/sales/'
        axios.post(endpoint,sales,{headers:{'Content-Type':"application/json",
        'Authorization':`Bearer ${token}`
    }})
    .then(res=> {
        return res.data
    })
    .catch(errors=>console.log(errors))
    }
    useEffect(()=>{
     getDay()
    },[])
    return(
        <div className="homeWrapper">
        <div>
        <h3>{dates}</h3>
        </div>
         <table>
            <thead>
                <tr>
                    <th>Medicine</th>
                    <th>Price</th>
                    <th>Quantity</th>
                </tr>
                
            </thead>
            <tbody>
                {
                    daysales.map((item,index)=>{
                        return(
                    <tr key={index}>
                        <td>{item.medicine}</td>
                        <td>{item.price}</td>
                        <td>{item.quantity}</td>
                    </tr>
                        )
                    })
                }
            </tbody>
         </table>
         <div className="todaySales">
            <div className="sales">
               {daysales.length !=0 ? <><p>Total Sales</p>
                <p>{totalprice}</p></>  : '' }
            </div>
         </div>
         <div className="AddWrapper">
            <div className="inputWrapper">
                <input value={sale.medicine} name='medicine' onChange={handleChange} type='text' placeholder='Medicine'/>
                <input value={sale.price} name='price' onChange={handleChange} type='text' placeholder='Price'/>
                <input value={sale.quantity} name='quantity' onChange={handleChange} type='text' placeholder='Quantity'/>
            </div>
            <button onClick={handleAdd}>Add</button>
         </div>
         <div className="closeBook">
            <button onClick={handleCloseBook}>Close Book</button>
         </div>
        </div>
    )
}
export default Home