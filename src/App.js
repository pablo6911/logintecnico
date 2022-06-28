import React from 'react'

import { ToastContainer } from 'react-toastify'
import tokenAuth from './components/config/token'

import { Routes, Route } from 'react-router-dom'
import Home from './components/Home/home'
import SingnInSingUp from './page/SingnInSingUp/SigninSignup'
import FornInicio from './page/vistaInicio/FormInicio'

import './assets/scss/styles.scss'
// Revisar si tenemos un token
const token = localStorage.getItem('token')
if (token) {
  tokenAuth(token)
}

function App() {
  console.log(process.env.REACT_APP_BACKEND_URL)
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signinSignup" element={<SingnInSingUp />} />
        <Route path="/fornInicio" element={<FornInicio />} />
      </Routes>
      {/*  <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/signinSignup" element={<SigninSignup />} />
      </Routes> */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        //la barra se oculta despues de 500mls
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

export default App
