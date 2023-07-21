import React from "react";
import { useLocation } from "react-router-dom";
const ImageViewer=()=>{
    const location = useLocation()
    const {state}=location
    console.log(state)
    return(
        <div className="imageViewWrapper">
         <img src={ `http://127.0.0.1:8000/${state}`} />
        </div>
    )
}
export default ImageViewer