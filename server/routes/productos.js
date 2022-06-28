// Rutas para crear usuarios
const express = require('express')
const router = express.Router()
const productosRouter = require('../controller/productosController')

// Crea un Producto
// api/
router.post('/', productosRouter.crearProducto)
router.get('/', productosRouter.mostrarProductos)
router.get('/:id', productosRouter.productId)
//Update
router.put('/:id', productosRouter.UpdateProduct)
router.delete('/:id', productosRouter.deleteProduct)

module.exports = router
