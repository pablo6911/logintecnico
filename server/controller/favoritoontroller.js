const Favoritos = require('../models/favoritos')
const { validationResult } = require('express-validator')

//Crear fovoritos
exports.crearFavoritos = async (req, res) => {
  // revisar si hay errores
  const errores = validationResult(req)
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() })
  }
  const { productoId } = req.body
  try {
    // Crear un nuevo proyecto
    const favoritos = new Favoritos(req.body)

    // Guardar el creador via JWT
    favoritos.userID = req.user.id

    // guardamos el favoritos
    favoritos.save()
    res.json(favoritos)
  } catch (error) {
    console.log(error)
    res.status(400).send('Hubo un error')
  }
}

//Mostramos favoritos
// Obtiene todos los proyectos del usuario actual
exports.mostramosFavoritos = async (req, res) => {
  // revisar si hay errores
  const errores = validationResult(req)
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() })
  }
  try {
    const favoritos = await Favoritos.find({ userID: req.user.id })
      .sort({
        fecha: -1,
      })
      .select({
        __v: 0,
      })
      .populate({
        path: 'userID',
        select: {
          password: 0,
          __v: 0,
        },
      })
    //console.log(req.user)
    res.json({ favoritos })
  } catch (error) {
    console.log(error)
    res.status(500).send('Hubo un error')
  }
}

//Delete Favorito
exports.deleteFavorito = async (req, res) => {
  // revisar si hay errores
  const errores = validationResult(req)
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() })
  }
  try {
    const id = req.params.id

    //revisamos el id
    const favorito = await Favoritos.findById(id)

    if (!favorito) {
      return res.status(404).json({ msg: 'Favorito no encontrado' })
    }

    //verivicar el creador del favorito
    if (favorito.userID.toString() !== req.user.id) {
      /* console.log(favorito.userID.toString())
      console.log(id) */
      return res.status(401).json({ msg: 'No autorizado' })
    }
    //eliminamos el proyecto de favorito
    await Favoritos.findOneAndRemove({ _id: id })
    //await favo.save()
    return res.json({ msg: 'Proyecto eliminado' })
  } catch (error) {
    console.log(error)
    res.status(500).send('Hubo un error')
  }
}
