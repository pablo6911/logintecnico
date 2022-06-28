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

//cada reducer tiene su propio state
const initialState = {
  token: localStorage.getItem('token'),
  users: [],
  error: null,
  loading: false,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case USUARIO_CREADO:
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        loading: action.payload,
      }
    case USUARIO_CREADO_EXITO:
      return {
        ...state,
        loading: false,
        mensaje: action.mensaje,
        users: [...state.users, action.payload],
      }
    case USUARIO_LOGIN_ERROR:
    case USUARIO_CREADO_ERROR:
      localStorage.removeItem('token')
      return {
        ...state,
        loading: false,
        token: null,
        error: action.payload,
      }
    //!---------USUARIO AUTH
    case OBTENER_USUARIO:
      return {
        ...state,
        loading: action.payload,
      }
    case OBTENER_USUARIO_EXITO:
      return {
        ...state,
        users: [...state.users, action.payload],
      }
    //!---------USUARIO lOGIN
    case USUARIO_LOGIN:
      return {
        ...state,
        loading: action.payload,
      }
    case USUARIO_LOGIN_EXITO:
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        loading: false,
        users: action.payload,
      }
    default:
      return state
  }
}
