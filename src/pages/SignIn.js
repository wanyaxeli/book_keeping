import React,{useState} from "react";
import { Link ,useNavigate} from "react-router-dom";
import axios from "axios";
const SignIn=()=>{
    const navigate=useNavigate()
    const initialState={username:"",email:'',password:""}
    const [values,setValues]=useState(initialState)
    const handleSignIn=(e)=>{
        e.preventDefault()
        const user={username:values.username,
            password:values.password.trim()}
        const url = 'http://127.0.0.1:8000/api/token/'
        axios.post(url,user,{headers:{'Content-Type':"application/json"}})
        .then((res)=>{
            const data= res.data
            console.group(res)
            const{access}=data
            localStorage.setItem('token',access)
            setValues(initialState)
            navigate('/')

        })
    }
    const handleChange=(e)=>{
    const value= e.target.value
    const name= e.target.name
    setValues({...values,[name]:value})
    }
    return(
        <div className="signInWapper">
            <h3>Sign In</h3>
            <input name='username' value={values.username} onChange={handleChange} type='text' placeholder='Username' /><br/>
            <input name='email' value={values.email} onChange={handleChange} type='email' placeholder='Email' /><br/>
            <input name='password' value={values.password} onChange={handleChange} type='password' placeholder='Password' />
            <div className="signInbtnWrapper">
                <button onClick={handleSignIn}>Sign In</button>
            </div>
            <div className="accountlink">
                <p>Don't have an account? <Link to='/login/singUp'>create</Link></p>
            </div>
        </div>
    )
}
export default SignIn