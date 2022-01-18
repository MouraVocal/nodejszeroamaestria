const express = require('express')
const exphbs = require('express-handlebars')

const port = 3000
const app = express()
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

const auth = true

app.get('/dashboard', (req, res) => {
  res.render('dashboard')
})

app.get('/', (req, res) => {
  const user = { name: 'Diego', age: '35' }
  res.render('home', { user, auth })
})

app.listen(port, () => console.log(`🍺 Server iniciado na porta ${port}`) )
