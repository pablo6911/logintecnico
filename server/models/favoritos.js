const mongoose = require('mongoose')

const FaboritoSchema = mongoose.Schema({
  productoId: {
    type: String,
    trim: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
  },
  Fecha: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = mongoose.model('Favoritos', FaboritoSchema)
