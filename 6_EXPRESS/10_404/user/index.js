const express = require('express')
const path = require('path')

const basePath = path.join(__dirname, '../templates')

const router = express.Router()

router.get('/register', (req, res) => {
  res.sendFile(`${basePath}/register.html`)
})

router.post('/register', (req, res) => {
  const { name, age } = req.body
  console.log(`O nome do usuário é ${name}, e sua idade é ${age}`)
  res.sendFile(`${basePath}/register.html`)
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  res.sendFile(`${basePath}/user.html`)
  console.log(`Buscando usuário com id: ${id}`)
})

module.exports = router
