const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')

const port = 3000
const app = express()

app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({
  extended: true
}))
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'nodemysql'
})

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.post('/books/insert', (req, res) => {
  const { title, pageqtd } = req.body

  const inserBookData = `INSERT INTO books (title, pageqtd) VALUES ('${title}', '${pageqtd}')`

  conn.query(inserBookData, (err) => {
    if(err) {
      return console.log(err)
    }

    console.log('Dados inseridos com sucesso!')
    res.redirect('/')
  })
})

app.get('/', (req, res) => {
  res.render('home')
})

conn.connect((err) => {
  if(err) {
    return console.log(err)
  }

  console.log('Banco de dados conectado com sucesso')
  app.listen(port, () => console.log(`🍺 Servidor iniciado na porta ${port}`))
})
