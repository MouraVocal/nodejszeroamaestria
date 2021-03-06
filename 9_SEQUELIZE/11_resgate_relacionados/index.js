const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')

const port = 3000

const app = express()
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

const User = require('./models/User')
const Address = require('./models/Adress')

app.post('/users/update', async (req, res) => {
  const { id, name, occupation } = req.body
  let { newsletter } = req.body

  if(newsletter === 'on') {
    newsletter = true
  } else {
    newsletter = false
  }

  const userData = {
    id,
    name,
    occupation,
    newsletter
  }

  await User.update(userData, { where: { id: id }})

  res.redirect('/')
})

app.post('/users/create', async (req, res) => {
  const { name, occupation } = req.body
  let { newsletter } = req.body
  if(newsletter === 'on') {
    newsletter = true
  } else {
    newsletter = false
  }

  await User.create({ name, occupation, newsletter })

  res.redirect('/')
})

app.post('/users/delete/:id', async (req, res) => {
  const { id } = req.params
  await User.destroy({ where: { id: id }})
  res.redirect('/')
})

app.post('/address/create', async (req, res) => {
  const { UserId, city, street, number } = req.body

  const addressData = {
    UserId,
    city,
    street,
    number
  }

  await Address.create(addressData)
  res.redirect(`/users/edit/${UserId}`)
})

app.post('/address/delete', async (req, res) => {
  const { id, UserId } = req.body
  await Address.destroy({ where: { id: id }})
  res.redirect(`/users/edit/${UserId}`)
})

app.get('/users/edit/:id', async (req, res) => {
  const { id } = req.params

  const user = await User.findOne({ include: Address, where: { id: id }})

  res.render('useredit', { user: user.get({ plain: true }) })
})

app.get('/users/create', (req, res) => {
  res.render('adduser')
})

app.get('/users/:id', async(req, res) => {
  const { id } = req.params

  const user = await User.findOne({ raw: true, where: { id: id } })
  console.log(user)

  res.render('userview', { user })
})

app.get('/', async (req, res) => {
  const users = await User.findAll({ raw: true })
  console.log(users)
  res.render('home', { users })
})

conn.sync()
  .then(() => app.listen(port, () => console.log(`???? Servidor iniciado na porta ${port}`)))
  .catch((err) => console.log(err))
