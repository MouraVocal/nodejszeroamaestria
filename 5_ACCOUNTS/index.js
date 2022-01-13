// modulos externos
const inquirer = require('inquirer')
const chalk = require('chalk')

// modulos internos
const fs = require('fs')

// init application
operation()

function operation() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'O que você deseja fazer?',
      choices: [
        'Criar conta',
        'Consultar Saldo',
        'Depositar',
        'Sacar',
        'Sair'
      ]
    },
  ]).then((answer) => {
    const action = answer['action']
    if(action === 'Criar conta') {
      createAccount()
    } else if(action === 'Depositar') {
      deposit()
    } else if(action === 'Consultar Saldo') {
      checkBalance()
    } else if(action === 'Sacar') {
      withdraw()
    } else if(action === 'Sair'){
      console.log(chalk.bgBlue.black('Obrigado por usar o Accounts!'))
      process.exit()
    }
  }).catch((err) => console.log(err))
}

// create an account
function createAccount() {
  console.log(chalk.bgGreen.black('Parabéns por escolher o nosso banco!'))
  console.log(chalk.green('Defina as opções da sua conta a seguir'))
  buildAccount()
}

// register an account
function buildAccount() {
  inquirer.prompt([
    {
      name: 'accountName',
      message: 'Digite um nome para a sua conta'
    }
  ]).then((answer) => {
    const accountName = answer['accountName']

    if(accountName === '') {
      console.log(chalk.bgRed.black('Por favor digite um nome para a sua conta'))
      buildAccount()
      return
    }

    if(!fs.existsSync('accounts')) {
      fs.mkdirSync('accounts')
    }

    if(fs.existsSync(`accounts/${accountName}.json`)) {
      console.log(chalk.bgRed.black('Esta conta já existe, escolha outro nome!'))
      buildAccount()
      return
    }

    fs.writeFileSync(`accounts/${accountName}.json`, '{"balance": 0}', (err) => console.log(err))

    console.log(chalk.green('Parabéns, a sua conta foi criada com sucesso!'))

    operation()
  }).catch((err) => console.log(err))
}

// add an amount to user account
function deposit() {
  inquirer.prompt([
    {
      name: 'accountName',
      message: 'Qual o  nome da sua conta?'
    }
  ]).then((answer) => {
    const accountName = answer['accountName']

    // verify if account exists
    if(!checkAccount(accountName)) {
      return deposit()
    }

    inquirer.prompt([
      {
        name: 'amount',
        message: 'Quanto você deseja depositar?'
      }
    ]).then((answer) => {
      const amount = answer['amount']

      // add an amount
      addAmount(accountName, amount)
      return operation()

    }).catch(((err) => console.log(err)))

  }).catch((err) => console.log(err))
}

// check if account exists
function checkAccount(accountName) {
  if(!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log(chalk.bgRed.black('Esta conta não existe, por favor, tente novamente.'))
    return false
  }

  return true
}

// add an ammount to the balance
function addAmount(accountName, amount) {
  const accountData = getAccount(accountName)

  if(!amount) {
    console.log('Você não digitou um valor válido, retornando ao início')
    return
  }

  accountData.balance = parseFloat(accountData.balance) + parseFloat(amount)

  fs.writeFileSync(
    `accounts/${accountName}.json`, 
    JSON.stringify(accountData), 
    (err) => console.log(err)
  )

  console.log(chalk.bgGreen.black(`O valor de R$${amount} foi adicionado à conta ${accountName}`))

}

// get account data
function getAccount(accountName) {
  const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: 'utf-8',
    flag: 'r'
  })

  return JSON.parse(accountJSON)
}

// check balance
function checkBalance() {
  inquirer.prompt([
    {
      name: 'accountName',
      message: 'Qual o nome da conta?'
    }
  ]).then((answer) => {
    const accountName = answer.accountName
    if(checkAccount(accountName)) {
      const balance = getAccount(accountName).balance
      console.log(chalk.bgGreen.black(`O saldo disponível é de R$${balance}`))
      return operation()
    }
    checkBalance()
  })
}

// withdraw
function withdraw() {
  inquirer.prompt([
    {
      name: 'accountName',
      message: 'Qual o nome da conta?'
    }
  ]).then((answer) => {
    const { accountName } = answer

    if(checkAccount(accountName)) {
      const accountData = getAccount(accountName)
      const { balance } = accountData

      inquirer.prompt([
        {
          name: 'value',
          message: 'Qual o valor que deseja sacar?'
        }
      ]).then((answer) => {
        const { value } = answer
        if(parseFloat(value) > parseFloat(balance)) {
          console.log(chalk.bgRed.black('O valor excede o saldo, tente novamente.'))
          return withdraw()
        }
        const rest = parseFloat(balance) - parseFloat(value)

        accountData.balance = rest

        const accountJSON = JSON.stringify(accountData)

        fs.writeFileSync(`accounts/${accountName}.json`, accountJSON, {
          encoding: 'utf-8'
        }, err => console.log(err))

        console.log(chalk.bgGreen.black(`O valor de R$${value} foi sacado da conta ${accountName}`))

        return operation()

      }).catch(err => console.log(err))

    } else {
      return withdraw()
    }
  }).catch(err => console.log(err))
}
