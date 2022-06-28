import {
  USUARIO_CREADO,
  USUARIO_CREADO_EXITO,
  USUARIO_CREADO_ERROR,
  OBTENER_USUARIO,
  OBTENER_USUARIO_EXITO,
  USUARIO_AUTH_ERROR,
  USUARIO_LOGIN,
  USUARIO_LOGIN_EXITO,
  USUARIO_LOGIN_ERROR,
} from '../types'

import clienteAxios from '../config/axios'
import tokenAuth from '../config/token'
import Swal from 'sweetalert2'

/* import axios from 'axios' */

//crear Nuevo Usuario
export function crearNuevoUsuarioAction(formData) {
  return async (dispatch) => {
    dispatch(usersAction())

    try {
      //insertamos en la api
      const respuesta = await clienteAxios.post('/api/usuarios', formData)
      console.log(respuesta.data)
      //si todo sale bien, actualizamos el state
      dispatch(usuarioExitoso(respuesta))
      // Obtener el usuario
      userAuthAction()
    } catch (error) {
      //console.log(error.response.data.msg)
      const alerta = {
        msg: error.response.data,
      }
      //si hay un error cambiamos el estate
      dispatch(usuarioError(alerta))
    }
  }
}

const usersAction = () => ({
  type: USUARIO_CREADO,
  payload: true,
})

//Si el pusuario se guarda en la base de datos
const usuarioExitoso = (respuesta) => ({
  type: USUARIO_CREADO_EXITO,
  payload: respuesta.config.data,
  mensaje: respuesta.data,
})

//si hubo un error
const usuarioError = (alerta) => ({
  type: USUARIO_CREADO_ERROR,
  payload: alerta,
})

//!---------USUARIO lOGIN
export function userLoginAction(formData) {
  return async (dispatch) => {
    dispatch(userslogin(formData))
    try {
      //insertamos en la api
      const respuesta = await clienteAxios.post('/api/usuarios/login', formData)
      //console.log(respuesta)
      //console.log(respuesta.data)
      //si todo sale bien, actualizamos el state
      dispatch(userLoginExitoso(respuesta))

      // Obtener el usuario
      userAuthAction()
    } catch (error) {
      console.log(error.response.data.msg)
      const alerta = {
        msg: error.response.data,
      }
      Swal.fire({
        icon: 'error',
        title: 'Email ó Password incorrecto',
      })
      //si hay un error cambiamos el estate
      dispatch(userLoginError(alerta))
      return
    }
  }
}

const userslogin = () => ({
  type: USUARIO_LOGIN,
  payload: true,
})

//Si el pusuario se guarda en la base de datos
const userLoginExitoso = (respuesta) => ({
  type: USUARIO_LOGIN_EXITO,
  payload: respuesta,
})

//si hubo un error
const userLoginError = (alerta) => ({
  type: USUARIO_LOGIN_ERROR,
  payload: alerta,
})

//!---------USUARIO Autenticado
export function userAuthAction(formData) {
  return async (dispatch) => {
    dispatch(usersAuth())
    const token = localStorage.getItem('token')
    if (token) {
      //Funcion para enviar el token
      tokenAuth(token)
    }

    try {
      //insertamos en la api
      const respuesta = await clienteAxios.get('/api/usuarios/login', formData)
      console.log('----------------------', respuesta)
      //si todo sale bien, actualizamos el state
      dispatch(userAuthExitoso(respuesta))
    } catch (error) {
      // console.log(error)
      const alerta = {
        msg: error.response.data.msg,
      }
      //si hay un error cambiamos el estate
      dispatch(userAuthError(alerta))
    }
  }
}

const usersAuth = () => ({
  type: OBTENER_USUARIO,
  payload: true,
})

//Si el pusuario se guarda en la base de datos
const userAuthExitoso = (respuesta) => ({
  type: OBTENER_USUARIO_EXITO,
  payload: respuesta.data,
})

//si hubo un error
const userAuthError = (alerta) => ({
  type: USUARIO_LOGIN_ERROR,
  payload: alerta,
})
