const express = require('express')
const exphbs = require('express-handlebars')

const port = 3000

const app = express()
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  const approved = false

  res.render('home', { approved })
})

app.listen(port, () => console.log(`🍺 Servidor iniciado na porta ${port}`))
