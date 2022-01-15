const express = require('express')
const path = require('path')

const app = express()
const port = 3000

const basePath = path.join(__dirname, 'templates')

app.use(express.urlencoded({
  extended: true
}))

app.use(express.json())

app.get('/user/register', (req, res) => {
  res.sendFile(`${basePath}/register.html`)
})

app.post('/user/register', (req, res) => {
  const { name, age } = req.body
  res.sendFile(`${basePath}/register.html`)
  console.log(`O nome do usuário é ${name}, e sua idade é ${age}`)
})

app.get('/user/:id', (req, res) => {
  const { id } = req.params
  res.sendFile(`${basePath}/user.html`)
  console.log(`Estamos buscando o usuário id:${id}`)
})

app.get('/', (req, res) => {
  res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => console.log(`Servidor iniciado na porta ${port}`))
