const express = require('express')
const path = require('path')

const app = express()
const port = 3000

const basePath = path.join(__dirname, 'templates')

const checkAuth = (req, res, next) => {
  req.authStatus = true

  if(req.authStatus) {
    console.log('O usuário está logado, pode prosseguir!')
    next()
    return
  }

  console.log('O usuário não está logado')
  next()
}

app.use(checkAuth)

app.get('/', (req, res) => {
  res.sendFile(`${basePath}/index.html`)
})


app.listen(port, () => console.log(`🍺 Servidor inciado na porta ${port}`))
