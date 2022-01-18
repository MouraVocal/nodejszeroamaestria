const express = require('express')
const exphbs = require('express-handlebars')

const port = 3000

const app = express()
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/dashboard', (req, res) => {
  const items = ['item a', 'item b', 'item c']
  res.render('dashboard', { items })
})

app.get('/', (req, res) => {
  res.render('home')
})

app.listen(port, () => console.log(`🍺 Servidor iniciado na porta ${port}`))
