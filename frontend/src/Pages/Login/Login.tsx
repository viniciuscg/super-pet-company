import { useNavigate } from "react-router-dom";
import { HiOutlineKey, HiOutlineMail } from 'react-icons/hi'
import { useState } from 'react'
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import './Login.css'
import { api } from "../../services/api";

function Login() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  
  const [errorLogin, setErrorLogin] = useState('');  

  const navigate = useNavigate()

  const login = async () => {
    if (!email || !password)
      return setErrorLogin("email ou senha incorreta")

    try {
      const response = await api.post('/login', {email, password})
      localStorage.setItem("id", response.data)
      gotoProfile()
    } catch (error: any) {
      setErrorLogin(error.Message)
    }
  }

  const gotoRegister = async () => {
    navigate(`/Register`);
  }
  
  const gotoProfile = async () => {
    const id = localStorage.getItem("id")
    navigate(`/Profile/${id}`);
  }

  return (
    <div className="container-login">

      <div className="login-card">
        <h1>Login</h1>
        <p>{errorLogin}</p>

        <div className="inputs-login">
          <Input 
            placeholder="email"
            startDecorator={<HiOutlineMail style={{ color: "#c7ecf4" }} />}
            style={{ background: "rgba(241, 241, 241, 0)", border: "1px solid #c7ecf4" }}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="password"
            startDecorator={<HiOutlineKey style={{ color: "#c7ecf4" }} />}
            style={{ background: "rgba(241, 241, 241, 0)", border: "1px solid #c7ecf4" }}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button 
            onClick={login}
            style={{ background: "rgba(241, 241, 241, 0)", border: "1px solid #c7ecf4" }}
          >
            Login
          </Button>
        </div>

        <div className="gotoregister">
          <span>Don't have an account?</span>
          <span onClick={gotoRegister} style={{cursor: "pointer", color: "#daf3f8"}}>Sign up</span>
        </div>
        <span style={{cursor: "pointer", color: "#daf3f8"}}>Forgot password</span>
      </div>
    </div>
  )
}

export default Login
