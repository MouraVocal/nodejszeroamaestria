const express = require('express')
const exphbs = require('express-handlebars')

const port = 3000

const app = express()

const hbs = exphbs.create({
  partialsDir: ['views/partials']
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/blog', (req, res) => {
  const posts = [
    {
      title: 'Aprendendo NodeJS',
      category: 'JavaScript',
      body: 'Teste',
      comments: 30
    },
    {
      title: 'Aprendendo PHP',
      category: 'PHP',
      body: 'Teste',
      comments: 30
    },
    {
      title: 'Aprendendo NodeJS',
      category: 'JavaScript',
      body: 'Teste',
      comments: 30
    }
  ]
  res.render('blogpost', { posts })
})

app.listen(port, () => console.log(`🍺 Servidor iniciado na porta ${port}`))
