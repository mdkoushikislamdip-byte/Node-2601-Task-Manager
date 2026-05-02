import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router";
import Registration from './pages/Registration';
import Login from './pages/Login';
import OTPVerification from './pages/OTPVerification';

const App = () => {
  return (
      <BrowserRouter>
      <Routes>
        <Route path='/registration' element={<Registration />} />
        <Route path='/login' element={<Login />} />
        <Route path='/otpverification' element={<OTPVerification />} />
      </Routes>
   </BrowserRouter>
  )
}

export default App
