import { Route,Routes } from "react-router-dom";
import CreateAccount from "../pages/CreateAccount";
import Home from "../pages/Home";
import ImageViewer from "../pages/ImageViewer";
import Login from "../pages/Login";
import Notifications from "../pages/Notifications";
import Receipts from "../pages/Receipts";
import Sales from "../pages/Sales";
import SignIn from "../pages/SignIn";
import Store from "../pages/Store";
import TrashCan from "../pages/TrashCan";
import Veiw from "../pages/View";
const Links=()=>{
    return(
        <Routes>
         <Route path="/" element={<Login/>}>
         <Route index element={<SignIn/>}/>
         <Route path="/login/signIn" element={<SignIn/>}/>
         <Route path="/login/singUp" element={<CreateAccount/>}/>
         </Route>
         <Route path="/wrapper" element={<Veiw/>}>
         <Route path="/wrapper/home" element={<Home/>}/>
         <Route index element={<Home/>}/>
         <Route path="/wrapper/store" element={<Store/>}/>
         <Route path="/wrapper/sales" element={<Sales/>}/>
         <Route path="/wrapper/receipts" element={<Receipts/>}/>
         <Route path="/wrapper/imageView" element={<ImageViewer/>}/>
         <Route path="/wrapper/trashCan" element={<TrashCan/>}/>
         <Route path="/wrapper/notifications"element={<Notifications/>}/>
         </Route>
        </Routes>
    )
}
export default Links