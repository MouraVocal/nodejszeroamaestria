const { urlencoded } = require('express')
const express = require('express')
const path = require('path')

const port = 3000
const app = express()

const basePath = path.join(__dirname, 'templates')

const users = require('./users')

app.use(urlencoded({
  extended: true
}))

app.use(express.json())

app.use('/user', users)

app.get('/', (req, res) => {
  res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => console.log(`Servidor iniciado na porta ${port}`))
