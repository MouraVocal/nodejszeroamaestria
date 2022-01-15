const express = require('express')
const path = require('path')

const app = express()
const basePath = path.join(__dirname, 'templates')
const port = 5000

const pageNotFound = (req, res, next) => {
  res.status(404).sendFile(`${basePath}/404.html`)
}

const user = require('./user')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('./user', user)
app.use(express.static('public'))
app.use('/user', user)

app.get('/', (req, res, next) => {
  res.sendFile(`${basePath}/index.html`)
})

app.use(pageNotFound)

app.listen(port, () => console.log(`🍺 Servidor iniciado na porta ${port}`))
