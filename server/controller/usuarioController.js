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

//creamos el usuario
exports.crearUsuario = async (req, res) => {
  // revisar si hay errores
  const errores = validationResult(req)
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() })
  }
  const { nombre, apellido, email, telefono, password, avatar, banner } =
    req.body

  try {
    // Revisar que el usuario registrado sea unico

    let user = await Users.findOne({ email })

    if (user) {
      return res.status(400).json({ msg: 'El usuario ya existe' })
    }
    //creamos el usuario
    user = await Users.create(req.body)
    // Hashear el password
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)

    // guardar usuario
    await user.save()

    // Crear y firmar el JWT
    const payload = {
      user: {
        id: user.id,
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
      /*  await Product.findByIdAndDeleteMany({
        _id: mongoose.Types.ObjectId(userId),
      }) */
      return res.send('eliminado')
    } else {
      res.status(404).send({})
    }
  } catch (error) {
    console.log(error)
    res.status(400).send('Hubo un error')
  }
}
//Delete loginUsuario
exports.loginUsuario = async (req, res) => {
  // revisar si hay errores
  const errores = validationResult(req)
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() })
  }

  // extraer el email y password
  const { email, password } = req.body

  try {
    // Revisar que sea un usuario registrado
    const user = await Users.findOne({ email })
    if (!user) {
      return res.status(400).json({ msg: 'El user no existe' })
    }

    // Revisar el password
    const passCorrecto = await bcrypt.compare(password, user.password)
    if (!passCorrecto) {
      return res.status(400).json({ msg: 'Password Incorrecto' })
    }

    // Si todo es correcto Crear y firmar el JWT
    const payload = {
      user: {
        id: user.id,
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
        res.json({ user, token })
      }
    )
  } catch (error) {
    console.log(error)
  }
}

// Obtiene que usuario esta autenticado
exports.usuarioAutenticado = async (req, res) => {
  try {
    const usuario = await Users.findById(req.user.id).select({
      password: 0,
      __v: 0,
    })
    res.json({ usuario })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Hubo un error' })
  }
}
