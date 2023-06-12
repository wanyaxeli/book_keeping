import React,{useState} from "react";
import UseAxios from "../components/UseAxios";
import { Link ,useNavigate} from "react-router-dom";
import axios from "axios";
const CreateAccount=()=>{
    const initialState={username:'',
    email:'',
    phone_number:'',
    password:"",
    confirm_password:''
}
    const [values,setValue]=useState(initialState)
    const navigate = useNavigate()
    const handleCreateAccount=()=>{
    const url ='http://127.0.0.1:8000/user/'
    axios.post(url,values,{headers:{'Content-Type':"application/json"}})
    navigate('/')
    }
    const handleChange=(e)=>{
    const value=e.target.value
    const name=e.target.name
    setValue({...values,[name]:value})
    }
    return(
    <div className="createAccountWapper">
        <h3>Create Account</h3>
        <input onChange={handleChange} name="username" type='text' placeholder='Username' /><br/>
        <input onChange={handleChange} name="email" type='email' placeholder='Email' /><br/>
        <input onChange={handleChange} name="phone_number" type='text' placeholder='Phone Number' /><br/>
        <input onChange={handleChange} name="password" type='password' placeholder='Password' /><br/>
        <input onChange={handleChange} name="confirm_password" type='password' placeholder='Confirm  Password' />
        <div className="signInbtnWrapper">
            <button onClick={handleCreateAccount}>Create Account</button>
        </div>
        <div className="accountlink">
            <p>Have an account already? <Link to='/login/signIn'>sign in</Link></p>
        </div>
    </div>
    )
}
export default CreateAccount