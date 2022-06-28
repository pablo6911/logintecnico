const express = require('express')
const app = express()
const volleyball = require('volleyball')
const db = require('./db/db')

const routes = require('./routes/index')
const cors = require('cors')

//conectasmos a la bd
db()

//habilitar cors
app.use(cors())

// logging middleware
app.use(volleyball)

//Habilitar express.json
app.use(express.json({ extended: true }))
//creamos un puerto
const PORT = process.env.PORT || 5000

app.use('/api', routes)

app.use('/api', (req, res) => {
  res.sendStatus(404)
})

app.use((err, req, res, next) => {
  console.log('ERROR')
  console.log(err)
  res.status(500).send(err.message)
})

app.get('/', (req, res) => {
  res.status(200).send('Desde el server')
})

//arrancamos el app
app.listen(PORT, () => {
  console.log('DB Connectd')
  console.log(`El server esta funcionando en el ${PORT}`)
})
