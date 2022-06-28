// Rutas para crear usuarios
const express = require('express')
const router = express.Router()
const usuarioRouter = require('../controller/usuarioController')
const adminRouter = require('../controller/adminController')
const { check } = require('express-validator')

//!----- Amin
//creamos user admin
router.post(
  '/',
  [
    check('email', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser minimo de 6 caracteres').isLength({
      min: 6,
    }),
  ],
  adminRouter.crearUsuarioAdmin
)

//api/login/admin
router.post(
  '/login',
  [
    check('email', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser minimo de 6 caracteres').isLength({
      min: 6,
    }),
  ],
  adminRouter.loginAdmin
)

//!----- usuario
//Mostramos datos del Usuario
router.get('/', usuarioRouter.mostrarUsuario)
router.get('/:id', usuarioRouter.mostrarUserId)
router.delete('/:id', usuarioRouter.deleteUser)

module.exports = router
