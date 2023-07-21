import React,{useEffect,useState} from "react";
import Modal from "../components/Modal";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import SearchBar from "../components/SearchBar";
import { fetchStock } from "../components/Slices";
const Store=()=>{
    const stock = useSelector(state=>state.sales)
    const dispatch=useDispatch()
    useEffect(()=>{
    dispatch(fetchStock())
    },[])
    return(
        <div className="storeWrapper">
          <SearchBar/>
         <table>
            <thead>
                <tr>
                    <th>Medicine</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Expiry</th>
                </tr>
            </thead>
            <tbody>
               {stock.store.stock.map((item,index)=>{
                return(
                    <tr key={index}>
                    <td>{item.medicine}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.expiry}</td>
                </tr>
                )
               })}
            </tbody>
         </table>
         <div className="addStockBtnWrapper">
            <Modal/>
         </div>
        </div>
    )
}
export default Store