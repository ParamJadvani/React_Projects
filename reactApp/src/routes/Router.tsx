import React from 'react'
import { Routes, Route } from "react-router"
import Home from '../pages/Home';
import SignupForm from '../components/SignupForm';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path='/signup' element={<SignupForm/>} />
    </Routes>
  );
}

export default Router