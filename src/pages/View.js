import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
const Veiw=()=>{
    return(
       <>
        <Header/>
        <Outlet/>
       </>
    )
}
export default Veiw