const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')

const port = 3000

const app = express()
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

app.post('/book/delete/:id', (req, res) => {
  const { id } = req.params

  const bookDelete = `DELETE FROM books WHERE id = '${id}'`

  conn.query(bookDelete, (err) => {
    if(err) {
      return console.log(err)
    }

    console.log('Livro deletado com sucesso')
    res.redirect('/books')
  })
})

app.post('/book/update', (req, res) => {
  const { title, pageqtd, id } = req.body

  const updateBook = `UPDATE books SET title = '${title}', pageqtd = '${pageqtd}' WHERE id = '${id}'`

  conn.query(updateBook, (err) => {
    if(err) {
      return console.log(err)
    }

    console.log('Dados atualizados com sucesso!')
    res.redirect('/books')
  })
})

app.get('/book/edit/:id', (req, res) => {
  const { id } = req.params

  const searchBook = `SELECT * FROM books WHERE id = '${id}'`
  conn.query(searchBook, (err, data) => {
    if(err) {
      return console.log(err)
    }

    const bookData = data[0]
    res.render('editbook', { bookData })
  })
})

app.get('/book/:id', (req, res) => {
  const { id } = req.params

  const selectedBook = `SELECT * FROM books WHERE id = '${id}'`

  conn.query(selectedBook, (err, data) => {
    if(err) {
      return console.log(err)
    }

    const bookDetails = data[0]

    res.render('bookdetails', { bookDetails })
  })
})

app.get('/books', (req, res) => {
  const getBookData = `SELECT * FROM books`
  
  conn.query(getBookData, (err, data) => {
    if(err) {
      return console.log(err)
    }

    if(data.length < 1) {
      return res.render('empty')
    }

    res.render('books', { data })
  })

})

app.post('/book/register', (req, res) => {
  const { title, pageqtd } = req.body
  const registerBook = `INSERT INTO books (title, pageqtd) VALUES('${title}', '${pageqtd}')`
  conn.query(registerBook, (err) => {
    if(err) {
      return console.log(err)
    }

    console.log('Dados inseridos com sucesso!')
  })
  res.redirect('/books')
})

app.get('/', (req, res) => {
  res.render('home')
})

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'nodemysql'
})

conn.connect((err) => {
  if(err) {
    return console.log(err)
  }

  console.log('Banco de dados conectado com sucesso!')

  app.listen(port, () => console.log(`🍺 Servidor iniciado na porta ${port} com sucesso!`))
})
