const express = require('express')
const exphbs = require('express-handlebars')

const port = 3000

const app = express()

const hbs = exphbs.create({
  partialsDir: ['views/partials']
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.get('/blog', (req, res) => {
  const posts = [
    {
      title: 'Aprender NodeJS',
      category: 'NodeJS',
      body: 'teste',
      comments: 4
    },
    {
      title: 'Aprender PHP',
      category: 'PHP',
      body: 'teste',
      comments: 5
    },
    {
      title: 'Aprender React',
      category: 'React',
      body: 'teste',
      comments: 2
    },
  ]

  res.render('blogpost', { posts })
})

app.listen(port, () => console.log(`🍺 Servidor iniciado na porta ${port}`))
