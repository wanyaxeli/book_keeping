import React from "react";
import { Outlet } from "react-router-dom";
import wallpaper from '../components/assets/wallpaper1.jpg'
const Login=()=>{
    return(
        <div className="loginWrapper">
        <img src={wallpaper}/>
        <div className="loginWrapper">
        <Outlet/> 
        </div>
        </div>
    )
}
export default Login