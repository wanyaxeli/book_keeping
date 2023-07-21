import React,{useEffect, useState} from "react";
import { useSelector,useDispatch } from "react-redux";
import { fetchStock } from "../components/Slices";
import { useLocation } from "react-router-dom";
const Notifications=()=>{
    const dispatch=useDispatch()
    const [readNotification,setreadNotification]=useState(false)
    const state=useSelector((state)=>{return state.sales})
    const [data,setData]=useState([])
    const location = useLocation()
    const {pathname}=location
    const[notificationOpen,setNotifictionOpen]=useState('')
    const splitpath= pathname.split('/')[2]
    useEffect(()=>{
        dispatch(fetchStock())
        },[])
      useEffect(()=>{
        getItem()
        },[])
    function setreadNotificationStatus(){
        if (splitpath==='notification'){
            setreadNotification(true)
        }

    }
    console.log(data)
    function getItem(){
        const stock=state.store.stock?state.store.stock:[]
        const dObect = new Date()
        const date= dObect.getDate()
        const month= dObect.getMonth() + 1
        const yeah= dObect.getFullYear()
        const fullDate=`${yeah}-${month}-${date}`
        stock.forEach(item=>{
            const ws=new WebSocket('ws://127.0.0.1:8000/ws/notification/')
            if (item.quantity < 4){
            
                const {medicine,quantity,expiry,price}=item
                ws.onopen=(e)=>{
                   ws.send(JSON.stringify({date:fullDate,medicine:medicine,price:price,expiry:expiry,quantity:quantity}))
                }
                ws.onmessage=(e)=>{
                    // setData(pre=>([JSON.parse(e.data)]))
                    // console.log(e.data)
                    // if (data.includes(JSON.parse(e.data))){
                    //     return  false
                    // }else {
                    //     setData(pre=>([...pre,JSON.parse(e.data)]))
                    // }
                    data.forEach(item=>{
                        if (item.medicine ===e.data.medicine && item.quantity ===e.data.quantity){
                            return false
                        }else{
                            setData(pre=>([JSON.parse(e.data)])) 
                            console.log(e.da)
                        }
                    })
                    }
                ws.onerror=(e)=>{
                    console.log(e)
                }
                ws.onclose=(e)=>{
                    console.log(e)
                }
            }
        })
    }
    return(
       <>
       {data.map((item,i)=>{
        return(
        <div key={i} className="nitificationWrapper">
            <div className="notificationText">
             <p>Your stock of  {item.medicine} is running out , you have {item.quantity} remaining </p><br/>
             <span>{item.date}</span>
            </div>
            <div className="notificationBtnWrapper">
                <span>&times;</span>
            </div>
        </div>
        )
       })}
       </>
    )
}
export default Notifications