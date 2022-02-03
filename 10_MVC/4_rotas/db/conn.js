const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('nodemvc', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql'
})

try{
  sequelize.authenticate()
  console.log('Banco de dados conectado com sucesso!');
} catch(err) {
  console.log(`Não foi possível conectar o banco de dados: ${err}`)
}

module.exports = sequelize
