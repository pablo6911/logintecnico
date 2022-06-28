// Rutas para crear usuarios
const express = require('express')
const router = express.Router()
const favoritosRouter = require('../controller/favoritoontroller')
const auth = require('../middleware/autenticacion')

// Creacion de favoritos
// api/
router.post('/', auth, favoritosRouter.crearFavoritos)
//lo revisamos en la web
/* router.get('/', auth, favoritosRouter.crearFavoritos) */

//Mostramos datos del Usuario id
router.get('/', auth, favoritosRouter.mostramosFavoritos)
router.delete('/:id', auth, favoritosRouter.deleteFavorito)

module.exports = router
