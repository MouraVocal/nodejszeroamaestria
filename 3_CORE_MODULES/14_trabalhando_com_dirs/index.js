const fs = require('fs')

const folderName = 'Nova Pasta'

if(!fs.existsSync(`./${folderName}`)) {
  console.log(`Não foi encontrada a pasta ${folderName}, portanto será criada!`)
  fs.mkdirSync(folderName)
} else {
  console.log(`A pasta ${folderName} já existe!`)
}
