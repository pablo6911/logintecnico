//conectandome con mongo
const mongoose = require('mongoose')
require('dotenv').config({ path: 'variables.env' })

const db = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Conexion exitosa con la base de datos')
  } catch (e) {
    console.log(e)
  }
}
module.exports = db
