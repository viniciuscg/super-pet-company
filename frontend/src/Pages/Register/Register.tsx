import Stack from '@mui/joy/Stack';
import LinearProgress from '@mui/joy/LinearProgress';
import Typography from '@mui/joy/Typography';
import { useState } from 'react';
import { HiOutlineKey, HiOutlineMail } from 'react-icons/hi';
import { BiUser } from 'react-icons/bi';
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { useNavigate } from "react-router-dom";
import { Input } from '@mui/joy';
import Button from '@mui/joy/Button';
import './Register.css'
import { UserServices } from '../../services/user/userServices';

function Register() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');  
  const [errorLogin, setErrorLogin] = useState('');  
  const minLength = 12;
  
  const navigate = useNavigate()
  
  const registerUser = async () => {
    if (!lastName || !name || !password || !email) 
      return setErrorLogin("usuario invalido")
    
    try {
      await UserServices.registerUser(email, password, name, lastName)
      gotoLogin()
    } catch (error: any) {
      setErrorLogin(error.message);
    }
  }

  const gotoLogin = async () => {
    navigate(`/Login`);
  }

  return (
    <div className="container-register">

      <div className="arrowtologin" onClick={gotoLogin}>
        <MdKeyboardArrowLeft style={{fontSize: "60px", cursor: "pointer"}}/>
      </div>

      <div className="register-card">
        <h1>Sign up</h1>
        <p>{errorLogin}</p>
        <div className="inputs-register">
          <Input 
            placeholder="name"
            startDecorator={<BiUser style={{ color: "#c7ecf4" }} />}
            style={{ background: "rgba(241, 241, 241, 0)", border: "1px solid #c7ecf4" }}
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Input 
            placeholder="last name"
            startDecorator={<BiUser style={{ color: "#c7ecf4" }} />}
            style={{ background: "rgba(241, 241, 241, 0)", border: "1px solid #c7ecf4" }}
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
          <Input 
            placeholder="email"
            startDecorator={<HiOutlineMail style={{ color: "#c7ecf4" }} />}
            style={{ background: "rgba(241, 241, 241, 0)", border: "1px solid #c7ecf4" }}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Stack
            spacing={0.5}
            sx={{
              '--hue': Math.min(password.length * 10, 120),
            }}
          >
            <Input
              type="password"
              placeholder="password"
              startDecorator={<HiOutlineKey style={{ color: "#c7ecf4" }}/>}
              style={{ background: "rgba(241, 241, 241, 0)", border: "1px solid #c7ecf4" }}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <LinearProgress
              determinate
              size="sm"
              value={Math.min((password.length * 100) / minLength, 100)}
              sx={{
                bgcolor: 'background.level3',
                color: 'hsl(var(--hue) 80% 40%)',
              }}
            />
            <Typography
              level="body3"
              sx={{ alignSelf: 'flex-end', color: 'hsl(var(--hue) 80% 30%)' }}
            >
              {password.length < 3 && 'Very weak'}
              {password.length >= 3 && password.length < 6 && 'Weak'}
              {password.length >= 6 && password.length < 10 && 'Strong'}
              {password.length >= 10 && 'Very strong'}
            </Typography>
          </Stack>
          <Button onClick={registerUser} style={{ background: "rgba(241, 241, 241, 0)", border: "1px solid #c7ecf4" }}>
            Sign up
          </Button>
        </div>

      </div>
    </div>
  )
}

export default Register
