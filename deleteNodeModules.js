// script gerado para otimizar o tamanho da pasta de estudo excluindo as node_modules, caso queira instalar as dependências de alguma pasta basta apenas abrir um terminal na pasta desejada e rodar o comando npm install

const fs = require('fs')
const path = require('path')

const chosenDirectory = 'node_modules'

const dirSearch = (dir) => {

  dirRemove(dir, chosenDirectory)

  fs.readdir(dir, (err, items) => {
    if(err) {
      return console.log(err)
    }

    items.forEach((item) => {
      const fullPath = path.join(dir, item)
      fs.stat(fullPath, (err, stats) => {
        if(err) { console.log(err) }
        if(stats.isDirectory()) {
          return dirSearch(fullPath)
        }
      })
    })
  })
}

const dirRemove = (dir, dirToRemove) => {
  const pathName = path.join(dir, dirToRemove)
  if(fs.existsSync(pathName)) {
    fs.rmdirSync(pathName, {
      recursive: true,
      force: true
    })
    
    return console.count('Pastas removidas')
  }
}

dirSearch(__dirname)
