import axios from "axios";
import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector ,useDispatch} from "react-redux";
import { fetchStock } from "../components/Slices";
const Home =()=>{
    const state=useSelector((state=>state.sales))
    const stock = state.store.stock
    const initialState={medicine:'',price:'',quantity:''}
    const dispatch=useDispatch()
    useEffect(()=>{
    dispatch(fetchStock())
    },[])
    const date =new Date().toDateString()
    const navigate=useNavigate()
    const [daysales,setDaySales]=useState([])
    const [renderSales,setRenderSales]=useState([])
    const [sale,setSale]=useState(initialState)
    const [totalprice,setTotalPrice]=useState(0)
    const [dates,setDates]=useState('')
    const handleChange=(e)=>{
        const value=e.target.value
        const name=e.target.name
        setSale({...sale,[name]:value})
    }
    const handleAdd=()=>{
        const medicineName= sale.medicine.toLowerCase()
        const medicineQuantity= sale.quantity
        const item =stock?stock.find(item=>item.medicine.toLowerCase() ===medicineName ):[]
        const {quantity,medicine}=item
        console.log(item)
        if(quantity >0 ){
            setDaySales(pre=>[...pre,sale])
            getTotalPrice()
            setSale(initialState)
            localStorage.setItem('sales',JSON.stringify(daysales))
            updateStore()
        }else{
            alert(`${medicine} is out of stock`)
        }
      
      
    }
    function updateStore(){
        const medicineName= sale.medicine.toLocaleLowerCase()
        const medicineQuantity= sale.quantity
        const item =stock?stock.find(item=>item.medicine.toLocaleLowerCase() ===medicineName ):[]
        const {quantity,id,expiry,medicine,user,price}=item
        if(quantity >0 && medicineQuantity <= quantity){
        const newQuantity= item.quantity - medicineQuantity
        const newItem={id:id,expiry:expiry,quantity:newQuantity,price:price,medicine:medicine,user:user}
        const token=localStorage.getItem("token")
        const endpoint=`http://127.0.0.1:8000/updateStore/${id}`
        try{
            axios.put(endpoint,newItem,{headers:{'Content-Type':"application/json",
            'Authorization':`Bearer ${token}` }}
        ).then(res=>{
            console.log(res.data)
        })
        }
        catch(error){
           console.log(error)
        }
        }else {
          alert ("your out of stock")
          return quantity
        }
    }
    function getTotalPrice () {
    const price= flatenedItems.reduce((accu,cur)=>{
        return accu + (cur.price * cur.quantity)
     },0)
     setTotalPrice(price)
    }
    function getDay(){
        setDates(date)
    }
    useEffect(()=>{
    getTotalPrice()
    },[renderSales])
    useEffect(()=>{
        let sales=localStorage.getItem('sales') 
        if (sales){
            let parsedSales=JSON.parse(sales)
            setDaySales(pre=>[...pre,parsedSales.flat()])
        }
    },[])
    useEffect(()=>{
        localStorage.setItem('sales',JSON.stringify(daysales))
        let sales=localStorage.getItem('sales') 
        let parsedSales=JSON.parse(sales)
        if (sales){
            setRenderSales([parsedSales.flat()])
        }
    },[daysales])
    const flatenedItems=renderSales.flat()
    const handleCloseBook=()=>{
        const token=localStorage.getItem("token")
        const stringifiedData=JSON.stringify(daysales)
        const sales = {date:date,items:stringifiedData,total:totalprice}
        const endpoint='http://127.0.0.1:8000/sales/'
        axios.post(endpoint,sales,{headers:{'Content-Type':"application/json",
        'Authorization':`Bearer ${token}`
    }})
    .then(res=> {
        console.log(res.data)
        navigate('/')
        localStorage.clear()
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
                    flatenedItems.map((item,index)=>{
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
               {renderSales.length !=0 ? <><p>Total Sales</p>
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