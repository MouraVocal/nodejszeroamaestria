const inquirer = require('inquirer')
const chalk = require('chalk')

inquirer.prompt([
  {
    name: 'name',
    message: 'Qual o seu nome?'
  },
  {
    name: 'age',
    message: 'Qual a sua idade?'
  }
]).then((answers) => {
  const { name, age } = answers

  if(!name || !age) {
    throw new Error('O nome e idade são obrigatórios!')
  }
    
  console.log(chalk.bgYellow.black(`Seu nome é ${name}, e sua idade é ${age}`))
}).catch((err) => {
  console.log(`Erro: ${err}`)
})
