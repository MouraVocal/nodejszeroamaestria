const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('nodesequelize', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql'
})

try {
  sequelize.authenticate().then(() => console.log('Banco de dados conectado com sucesso!'))
} catch(err) {
  console.log(err)
}

module.exports = sequelize
