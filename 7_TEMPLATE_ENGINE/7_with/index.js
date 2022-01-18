const express = require('express')
const exphbs = require('express-handlebars')

const port = 3000

const app = express()
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/post', (req, res) => {
  const post = {
    title: 'Aprender NodeJs',
    category: 'JavaScript',
    body: 'Este artigo vai te ajudar',
    comments: 4,
    tags: ['javascript', 'programação', 'dev', 'NodeJs', 'backend']
  }
  res.render('blogpost', { post })
})

app.listen(port, () => console.log(`🍺 Servidor iniciado na porta ${port}`))