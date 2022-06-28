const Product = require('../models/Producto')

const { validationResult } = require('express-validator')
const { default: mongoose, Types } = require('mongoose')

//Mostrar produtsId
exports.productId = async (req, res) => {
  try {
    const { productId } = req.params
    const products = await Product.findById(productId).select({
      __v: 0,
    })
    /* .populate({
        path: 'user',
        select: {
          password: 0,
          __v: 0,
        },
      }) */

    if (products) {
      return res.send({ data: products })
    } else {
      return res.status(404).send({})
    }
  } catch (error) {
    console.log(error)
    res.status(400).send('Hubo un error')
  }
}

//Mostramos todos los Productos
exports.mostrarProductos = async (req, res) => {
  try {
    const itemPaginas = 5
    //Saber cuantos productos tengo
    const total = await Product.count()
    //saber en que pagina estamos
    const page = parseInt(req.query.page)
    const start = (page - 1) * itemPaginas

    const productos = await Product.find().skip(start).limit(itemPaginas)

    res.send({
      Page: page,
      perPage: itemPaginas,
      total: total,
      totalPages: Math.ceil(total / itemPaginas),
      data: productos,
    })
  } catch (error) {
    console.log(error)
    res.status(400).send('Hubo un error')
  }
}

//creamos un Producto
exports.crearProducto = async (req, res) => {
  // revisar si hay errores
  const errores = validationResult(req)
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() })
  }
  try {
    const { nombre, year, precio, avatar, description } = req.body

    let newProst = await Product.create(req.body)

    await newProst.save()

    return res.json({ msg: 'Producto creado' })
  } catch (error) {
    console.log(error)
    res.status(400).send('Hubo un error')
  }
}

//Update
exports.UpdateProduct = async (req, res) => {
  // revisar si hay errores
  const errores = validationResult(req)
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() })
  }
  try {
    const { nombre, year, precio, avatar, description } = req.body

    const datosActilizados = { nombre, year, precio, avatar, description }

    const datos = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: datosActilizados },
      { new: false }
    )

    if (datos) {
      res.json({ msg: 'Prdocucto actualizado' })
    } else {
      return res.status(404).send({})
    }
  } catch (error) {
    console.log(error)
    res.status(500).send('Hubo un error')
  }
}

//Eliminamos un producto
exports.deleteProduct = async (req, res) => {
  // revisar si hay errores
  const errores = validationResult(req)
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() })
  }
  try {
    const { id } = req.params

    let deleted = await Product.deleteOne({ _id: id })
    if (deleted) {
      return res.json({ msg: 'Prdocucto eliminado' })
    } else {
      return res.status(400).send({})
    }
  } catch (error) {
    console.log(error)
    res.status(400).send('Hubo un error')
  }
}

/* //Delete User
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId

    const user = await Users.findByIdAndDelete(userId)

    if (user) {
      await Product.findByIdAndDeleteMany({
        _id: mongoose.Types.ObjectId(userId),
      })
      return res.send('ok')
    } else {
      res.status(404).send({})
    }
  } catch (error) {
    console.log(error)
    res.status(400).send('Hubo un error')
  }
}
 */
