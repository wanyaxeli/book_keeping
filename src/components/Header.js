import React,{useEffect,useState} from "react";
import { Link ,useLocation} from "react-router-dom";
const Header = ()=>{
    const location = useLocation()
    const {pathname}=location
    const[notificationOpen,setNotifictionOpen]=useState('')
    const splitpath= pathname.split('/')[2]
    function setBarge(){
        if (splitpath==='notifications'){
            setNotifictionOpen(true)
        }else{
            setNotifictionOpen('')
        }
    }
   useEffect(()=>{
   setBarge()
   },[splitpath])
    return (
        <div className="nav">
           <header>
           <ul>
            <li className={splitpath ==='home' ? "active" : ''}><Link to='/wrapper/home'>Home</Link></li>
            <li className={splitpath ==='store' ? "active" : ''}><Link to='/wrapper/store'>Store</Link></li>
            <li className={splitpath ==='sales' ? "active" : ''}><Link to='/wrapper/sales'>Sales</Link></li>
            <li className={splitpath ==='receipts' ? "active" : ''}><Link to='/wrapper/receipts'>Receipts</Link></li>
            <li className={splitpath ==='trashCan' ? "active" : ''}><Link to='/wrapper/trashCan'>Trash Bin</Link> </li>
            <li><div className="noificationWrapper"><Link to='/wrapper/notifications'><i className="fa fa-bell" aria-hidden="true"></i></Link>
             {notificationOpen===''?<div className="notifyer"><p>1</p></div>:''}
            </div></li>
            <li><Link to='/'>Logout</Link></li>
           </ul>
           </header>
        </div>
    )
}
export default Header