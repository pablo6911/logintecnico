import React from 'react'
import { Link } from 'react-router-dom'
import '../../assets/scss/styles.scss'

const Nabvar = () => {
  return (
    <nav class="navbar">
      <Link to="/signinSignup" className="navbarSection">
        Login
      </Link>
    </nav>
  )
}

export default Nabvar
