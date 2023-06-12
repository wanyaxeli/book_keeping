import { Route,Routes } from "react-router-dom";
import CreateAccount from "../pages/CreateAccount";
import Home from "../pages/Home";
import ImageViewer from "../pages/ImageViewer";
import Login from "../pages/Login";
import Receipts from "../pages/Receipts";
import Sales from "../pages/Sales";
import SignIn from "../pages/SignIn";
import Store from "../pages/Store";
import TrashCan from "../pages/TrashCan";
import Veiw from "../pages/View";
const Links=()=>{
    return(
        <Routes>
         <Route path="/login" element={<Login/>}>
         <Route index element={<SignIn/>}/>
         <Route path="/login/signIn" element={<SignIn/>}/>
         <Route path="/login/singUp" element={<CreateAccount/>}/>
         </Route>
         <Route path="/" element={<Veiw/>}>
         <Route path="/home" element={<Home/>}/>
         <Route index element={<Home/>}/>
         <Route path="/store" element={<Store/>}/>
         <Route path="/sales" element={<Sales/>}/>
         <Route path="/receipts" element={<Receipts/>}/>
         <Route path="/imageView" element={<ImageViewer/>}/>
         <Route path="/trashCan" element={<TrashCan/>}/>
         </Route>
        </Routes>
    )
}
export default Links