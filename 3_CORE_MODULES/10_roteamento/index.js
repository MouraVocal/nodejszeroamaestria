const fs = require('fs')
const http = require('http')
const url = require('url')

const port = 3000

const server = http.createServer((req, res) => {
  const q = url.parse(req.url, true)
  const filename = q.pathname.substring(1)

  if(filename.includes('html')) {
    if(fs.existsSync(filename)) {
      fs.readFile(filename, (err, data) => {
        if(err) {
          return res.end(err.message)
        }
        res.writeHead(200, {'content-type': 'text/html'})
        res.write(data)
        return res.end()
      })
    } else {
      fs.readFile('404.html', (err, data) => {
        res.writeHead(404, {'content-type': 'text/html'})
        if(err) {
          return res.end(err.message)
        }
        res.end(data)
      })
    }
  }
})

server.listen(port, () => console.log(`Server iniciado na porta ${port}`))
