// Rutas para crear usuarios
const express = require('express')
const router = express.Router()
const usuarioRouter = require('../controller/usuarioController')
const { check } = require('express-validator')
const auth = require('../middleware/autenticacion')

// Crea un usuario
// api/
router.post(
  '/',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El Apellido es obligatorio').not().isEmpty(),
    check('email', 'Agrega un email válido').isEmail(),
    check('telefono', 'El telefono es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser minimo de 6 caracteres').isLength({
      min: 6,
    }),
  ],
  usuarioRouter.crearUsuario
)
//Mostramos datos del Usuario
router.get('/', usuarioRouter.mostrarUsuario)
router.get('/:id', usuarioRouter.mostrarUserId)
router.delete('/:id', usuarioRouter.deleteUser)

//api/login
router.post(
  '/login',
  [
    check('email', 'Agrega un email valido').isEmail(),
    check('password', 'El password debe ser minimo de 6 caracteres').isLength({
      min: 6,
    }),
  ],
  usuarioRouter.loginUsuario
)

// Obtiene el usuario autenticado
router.get('/login', auth, usuarioRouter.usuarioAutenticado)

module.exports = router
