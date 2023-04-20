const Koa = require('koa')
const app = new Koa()

app.use(async (ctx) => {
  if (ctx.url === '/') {
    ctx.status = 200
    ctx.body = '<h1>Index Page</h1>'
  } else if (ctx.url === '/about') {
    ctx.status = 200
    ctx.body = '<h1>About Page</h1>'
  } else if (ctx.url === '/contact') {
    ctx.status = 200
    ctx.body = '<h1>Contact Page</h1>'
  } else {
    ctx.status = 404
    ctx.body = '<h1>Page Not Found</h1>'
  }
})

const port = 3000

app.listen(port, () => {
  console.log(`Sunucu ${port} da aktif.`)
})
