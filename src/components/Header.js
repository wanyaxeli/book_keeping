import React from "react";
import { Link ,useLocation} from "react-router-dom";
const Header = ()=>{
    const location = useLocation()
    const {pathname}=location
    const splitpath= pathname.split('/')[1]
    return (
        <div className="nav">
           <header>
           <ul>
            <li className={splitpath ==='home' ? "active" : ''}><Link to='/home'>Home</Link></li>
            <li className={splitpath ==='store' ? "active" : ''}><Link to='/store'>Store</Link></li>
            <li className={splitpath ==='sales' ? "active" : ''}><Link to='/sales'>Sales</Link></li>
            <li className={splitpath ==='receipts' ? "active" : ''}><Link to='/receipts'>Receipts</Link></li>
            <li className={splitpath ==='trashCan' ? "active" : ''}><Link to='/trashCan'>Trash Bin</Link> </li>
            <li>Notification</li>
            <li><Link to='/login'>Logout</Link></li>
           </ul>
           </header>
        </div>
    )
}
export default Header