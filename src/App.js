import Header from './components/Header';
import './App.css';
import Links from './components/Links';
import jwtDecode from 'jwt-decode';
import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
function App() {
  const navigate=useNavigate()
  useEffect(()=>{
  const token=localStorage.getItem('token')
  if (token){
    const decodedToken=jwtDecode(token)
    if (decodedToken.exp * 1000 <= Date.now()){
      localStorage.removeItem('token')
      window.location.reload(true)
      navigate('/')
    }
  }
  },[])
  return (
    <div className="App">
      <Links/>
    </div>
  );
}

export default App;
