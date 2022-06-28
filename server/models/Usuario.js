const mongoose = require('mongoose')

const UsuariosSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  apellido: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  telefono: {
    type: Number,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  avatar: {
    type: String,
  },
  banner: {
    type: String,
  },
  fechaCreacion: {
    type: Date,
    default: Date.now(),
  },
  roles: ['userAdminAnyDatabase'],
})

module.exports = mongoose.model('Usuario', UsuariosSchema)
