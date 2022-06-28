const Admin = require('../models/Admin')
const Users = require('../models/Usuario')
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//Retorna un Usuario segun su ID
exports.mostrarUserId = async (req, res) => {
  const { userId } = req.params
  const user = await Users.findById(userId).select({ password: 0, __v: 0 })

  if (user) {
    return res.send(user)
  } else {
    return res.status(404).send({})
  }
}

//Mostramos todos los usuarios
exports.mostrarUsuario = async (req, res) => {
  //obtenemos datos
  const datosUsuario = await Users.find().select({ password: 0, __v: 0 })
  return res.json({ datosUsuario })
}

exports.loginAdmin = async (req, res) => {
  // revisar si hay errores
  const errores = validationResult(req)
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() })
  }

  // extraer el email y password
  const { email, password } = req.body

  try {
    // Revisar que sea un usuario registrado
    let admin = await Admin.findOne({ email })
    if (!admin) {
      return res.status(400).json({ msg: 'El usuario no existe' })
    }

    // Revisar el password
    const passCorrecto = await bcrypt.compare(password, admin.password)
    if (!passCorrecto) {
      return res.status(400).json({ msg: 'Password Incorrecto' })
    }

    // Si todo es correcto Crear y firmar el JWT
    const payload = {
      admin: {
        id: admin.id,
      },
    }

    // firmar el JWT
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600, // 1 hora
      },
      (error, token) => {
        if (error) throw error

        // Mensaje de confirmación
        res.json({ token })
      }
    )
  } catch (error) {
    console.log(error)
  }
}

//creamos el usuario
exports.crearUsuarioAdmin = async (req, res) => {
  // revisar si hay errores
  const errores = validationResult(req)
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() })
  }
  const { email, password } = req.body

  try {
    // Revisar que el usuario registrado sea unico
    let newAdmin = await Admin.findOne({ email })

    if (newAdmin) {
      return res.status(400).json({ msg: 'El usuario ya existe' })
    }
    //creamos el usuario
    newAdmin = await Admin.create(req.body)
    // Hashear el password
    const salt = await bcrypt.genSalt(10)
    newAdmin.password = await bcrypt.hash(password, salt)

    // guardar usuario
    await newAdmin.save()

    // Crear y firmar el JWT
    const payload = {
      newAdmin: {
        id: newAdmin.id,
      },
    }

    // firmar el JWT
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600, // 1 hora
      },
      (error, token) => {
        if (error) throw error

        // Mensaje de confirmación
        res.json({ token })
      }
    )
    //return    res.json({ msg: 'Usuario creado' })
  } catch (error) {
    console.log(error)
    res.status(400).send('Hubo un error')
  }
}

//Delete User
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId

    const user = await Users.findByIdAndDelete(userId)

    if (user) {
      return res.send('ok')
    } else {
      res.status(404).send({})
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
