const express = require('express')
const path = require('path')

const port = 3000
const app = express()

const basePath = path.join(__dirname, 'templates')

app.get('/user/:id', (req, res) => {
  const { id } = req.params
  res.sendFile(`${basePath}/user.html`)
  console.log(`Estamos buscando o usuário id:${id}`)
})

app.get('/', (req, res) => {
  res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => console.log(`Servidor iniciado na porta ${port}`))
