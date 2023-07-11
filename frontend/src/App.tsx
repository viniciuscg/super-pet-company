import Login from "./Pages/Login/Login"
import Register from "./Pages/Register/Register"
import Profile from "./Pages/Profile/Profile"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import React from "react"
import './App.css'


function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/Login" element={<Login />}/>
          <Route path="/Register" element={<Register />}/>
          <Route path="/Profile/:id" element={<Profile />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
