import React from 'react'
import Sidebar from '../../layout/sidebar/Sidebar'
import Barra from '../../layout/sidebar/Barra'
import Mensaje from './FormMensaje'

export default function FormInicio() {
  return (
    <div className="contenedor-app">
      <Sidebar />
      <div className="seccion-principal">
        <Barra />
        <main>
          <Mensaje />
          <div className="contenedor-tareas"></div>
        </main>
      </div>
    </div>
  )
}
