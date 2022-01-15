const express = require('express')
const path = require('path')

const router = express.Router()
const basePath = path.join(__dirname, '../templates')

router.get('/register', (req, res) => {
  res.sendFile(`${basePath}/register.html`)
})

router.post('/register', (req, res) => {
  const { name, age } = req.body
  console.log(`O nome do usuário é ${name}, e sua idade é ${age}`)
  res.sendFile(`${basePath}/register.html`)
})

router.get('/:id', (req, res) => {
  res.sendFile(`${basePath}/user.html`)
  const { id } = req.params
  console.log(`Buscando usuário com id: ${id}`)
})

module.exports = router
