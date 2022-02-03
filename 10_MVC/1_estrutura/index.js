const express = require('express')
const exphbs = require('express-handlebars')

const port = 3000

// Express
const app = express()
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// Server
app.listen(port, () => console.log(`🍺 Servidor iniciado na porta ${port}`))
