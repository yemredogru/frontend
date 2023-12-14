import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import axios from "axios";
import Button from '@mui/material/Button';
import { useState } from "react";

const Login = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const [error,isError] = useState(false)
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")


  const handleLogin = async () => {
    await axios.post('http://localhost:3000/auth/login',{
        username: username,
        password: password,
      },{
        headers: {
            "Accept": "*/*, application/json, text/plain",
            }
      })
      .then((res)=>{
        setToken(res.data.access_token);
        navigate("/", { replace: true });
      })
      .catch((err)=>{
        console.log(err)
        isError(true)
      })
    
  };


  return <>
  <label for="username">UserName</label>
  <input type="text" onChange={(e)=>{setUsername(e.target.value)}} id="username" />
  <label for="username">Password</label>
  <input type="password" onChange={(e)=>{setPassword(e.target.value)}} id="password" />
  <Button onClick={handleLogin} variant="text">Login</Button>
  {error ? <p>Wrong username or password</p>:''}
  </>;
};

export default Login;