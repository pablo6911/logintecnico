const { mongoose, Schema } = require('mongoose')

const ProductosSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  year: {
    type: String,
    default: new Date(),
  },
  precio: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  description: {
    type: String,
    //required: true,
  },
})

module.exports = mongoose.model('Productos', ProductosSchema)
