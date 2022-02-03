const express = require('express')
const exphbs = require('express-handlebars')
const db = require('./db/conn')
const taskRoutes = require('./routes/taskRoutes')

// PORT
const port = 3000

// EXPRESS
const app = express()
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// ROUTES
app.use('/tasks', taskRoutes)

// SERVER
db.sync()
  .then(() => app.listen(port, () => console.log(`Servidor iniciado com sucesso na porta ${port}`)))
  .catch(err => console.log(err))
