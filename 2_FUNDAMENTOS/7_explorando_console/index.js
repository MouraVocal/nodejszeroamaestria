// mais de um valor
const x = 10
const y = 'Diego'
const z = [1, 2]

console.log(x, y, z)

// contagem de impressões
console.count(`O valor de x é ${x}`)
console.count(`O valor de x é ${x}`)
console.count(`O valor de x é ${x}`)
console.count(`Outro texto`)

// variavel entre string
console.log("O nome é %s, ele é programador", y)

// limpar o console

setTimeout(() => {
  console.clear()
}, 2000)
