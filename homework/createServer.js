const http = require('http')

const server = http.createServer((req, res) => {
  console.log('Bir istek gönderildi.')

  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write('<h2>Index Page</h2>')
  } else if (req.url === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write('<h2>About Page</h2>')
  } else if (req.url === '/contact') {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write('<h2>Contact Page</h2>')
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' })
    res.write('<h2>Page Not Found</h2>')
  }

  res.end()
})

const port = 5000

server.listen(port, () => {
  console.log(`Sunucu port ${port} de başlatıldı.`)
})
