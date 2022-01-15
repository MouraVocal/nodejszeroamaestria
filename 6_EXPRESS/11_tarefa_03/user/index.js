const express = require('express')
const path = require('path')

const router = express.Router()

const basePath = path.join(__dirname, '../templates')

router.get('/:id', (req, res) => {
  const { id } = req.params
  res.sendFile(`${basePath}/user.html`)
  console.log(`Buscando usuário com id: ${id}`)
})

module.exports = router
