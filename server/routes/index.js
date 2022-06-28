const express = require('express')
const router = express.Router()

const usuarioRouter = require('./usuarios')
const adminRouter = require('./admin')
const productosRouter = require('./productos')
const favoritosRouter = require('./favoritos')

//!-----Router Usuario
//api/usuaros || api/usuaros/login
router.use('/usuarios', usuarioRouter)
//Update || Mostramos producto por Id || delete
router.use('/mostrarUser/:id', usuarioRouter)

//!-----Router Admin
//api/admin || api/admin/login
router.use('/admin', adminRouter)
//trabajo con usuarios
router.use('/mostrarUser', usuarioRouter)
//Update || Mostramos user por Id || delete
router.use('/mostrarUser/:id', usuarioRouter)

//TODO-----Router Productos
router.use('/productos', productosRouter)
router.use('/mostrarProduct', productosRouter)
//Update || Mostramos producto por Id || delete
router.use('/mostrarProduct/:_id', productosRouter)

//?------Favoritos
router.use('/favoritos', favoritosRouter)
router.use('/favoritos/:id', favoritosRouter)

//!-----Router Auth
router.use('/usuarios', usuarioRouter)

module.exports = router
