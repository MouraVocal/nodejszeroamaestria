const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')

// Models
const Task = require('./models/Task')

// PORT
const port = 3000

// Express
const app = express()
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// Server
conn.sync()
  .then(() => {
    app.listen(port, () => console.log(`🍺 Servidor iniciado na porta ${port}`))
  })
  .catch(err => console.log(err))
