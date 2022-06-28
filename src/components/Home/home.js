import React from 'react'
import Nabvar from '../Nabvar/Nabvar'
import Logo from '../../assets/img/logo.png'

import '../../assets/scss/styles.scss'

export default function home() {
  return (
    <>
      <Nabvar />
      <div className="home">
        <div className="home-div1">
          <div>
            <img src={Logo} alt="log" className="home-logo" />
          </div>
        </div>
        <h1>BIENVENIDOS</h1>
      </div>
    </>
  )
}
