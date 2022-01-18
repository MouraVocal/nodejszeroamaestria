const express =  require('express')
const exphbs = require('express-handlebars')

const port = 3000

const app = express()
const hbs = exphbs.create({
  partialsDir: ['views/partials']
})
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.use(express.static('public'))

const products = [
  {
    id: 1,
    name: 'Playstation 5',
    price: 'R$5000,00',
    desc: 'O vídeo game do momento.',
    tags: ['Playstation', 'VideoGame', 'Eletronico']
  },
  {
    id: 2,
    name: 'Ventilador',
    price: 'R$100,00',
    desc: 'Para aliviar os dias quentes',
    tags: ['Eletrodomestico', 'Calor']
  },
  {
    id: 3,
    name: 'Cerveja Lata',
    price: 'R$4,99',
    desc: 'Abra uma para relaxar',
    tags: ['Bebida', 'Artesanal', 'Alcoolico']
  },
]

app.get('/products/:id', (req, res) => {
  const { id } = req.params
  const chosenProduct = products.filter((item) => item.id === Number(id))[0]

  res.render('productpage', { chosenProduct })
})

app.get('/', (req, res) => {
  res.render('home', { products })
})

app.listen(port, () => console.log(`🍺 Servidor iniciado na porta ${port}`))
