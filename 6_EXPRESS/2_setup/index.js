const express = require('express')
const app = express()
const port = 3000 // variável de ambiente

app.get('/', (req, res) => {
  res.send('Olá mundo!')
})

app.listen(port, () => console.log(`Server inciado na porta ${port}`))
