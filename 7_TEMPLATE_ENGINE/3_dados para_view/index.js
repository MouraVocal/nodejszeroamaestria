const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const port = 3000

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  const user = {
    name: 'Diego',
    lastName: 'Moura da Silva',
    age: 35,
  }
  
  const palavra = 'palavra'

  res.render('home', { user, palavra })
})

app.listen(port, () => console.log(`🍺 Servidor iniciado na porta ${port}`))
