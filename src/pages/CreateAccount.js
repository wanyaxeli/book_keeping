import React,{useState} from "react";
import UseAxios from "../components/UseAxios";
import { Link ,useNavigate} from "react-router-dom";
import axios from "axios";
const CreateAccount=()=>{
    const initialState={username:'',
    email:'',
    first_name:'',
    last_name:'',
    phone_number:'',
    password:"",
    confirm_password:''
}
    const [values,setValue]=useState(initialState)
    const navigate = useNavigate()
    const handleCreateAccount=(e)=>{
         e.preventDefault()
        const url ='http://127.0.0.1:8000/user/'
        axios.post(url,values,{headers:{'Content-Type':"application/json"}})
        .then(res=>{
            console.log(res.data)
            navigate('/')
        })
    }
    const handleChange=(e)=>{
    const value=e.target.value
    const name=e.target.name
    setValue({...values,[name]:value})
    }
    return(
    <div className="createAccountWapper">
        <h3>Create Account</h3>
        <form>
        <input onChange={handleChange} name="username" type='text' placeholder='Username' /><br/>
        <input onChange={handleChange} name="first_name" type='text' placeholder='first name' /><br/>
        <input onChange={handleChange} name="last_name" type='text' placeholder='Last name' /><br/>
        <input onChange={handleChange} name="email" type='email' placeholder='Email' /><br/>
        <input onChange={handleChange} name="phone_number" type='text' placeholder='Phone Number' /><br/>
        <input onChange={handleChange} name="password" type='password' placeholder='Password' /><br/>
        <input onChange={handleChange} name="confirm_password" type='password' placeholder='Confirm  Password' />
        <div className="signInbtnWrapper">
            <button  type="submit" onClick={handleCreateAccount}>Create Account</button>
        </div>
        </form>
        <div className="accountlink">
            <p>Have an account already? <Link to='/login/signIn'>sign in</Link></p>
        </div>
    </div>
    )
}
export default CreateAccount