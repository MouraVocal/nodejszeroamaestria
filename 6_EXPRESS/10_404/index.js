const express = require('express')
const path = require('path')

const app = express()

const port = 3000
const user = require('./user')
const basePath = path.join(__dirname, 'templates')

const pageNotFound = (req, res, next) => {
  res.status(404).sendFile(`${basePath}/404.html`)
} 

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))
app.use(express.static('public'))
app.use('/user', user)

app.get('/', (req, res) => {
  res.sendFile(`${basePath}/index.html`)
})

app.use(pageNotFound)

app.listen(port, () => console.log(`🍺 Servidor iniciado na porta ${port}`))
