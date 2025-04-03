const { createServer: createHttpsServer } = require('https')
const { parse } = require('url')
const next = require('next')
const fs = require('fs')
const path = require('path')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'local.event.albamon.com'
const httpsPort = 4300

const app = next({ dev, hostname, port: httpsPort })
const handle = app.getRequestHandler()

const sslOptions = {
  key: fs.readFileSync(path.resolve(__dirname, './cert/local.event.key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, './cert/local.event.cert.pem')),
  requestCert: false,
  rejectUnauthorized: false,
}

const strings = {
  ready: '[ \x1b[32mready\x1b[0m ]',
  http: '\x1b[43mHTTP\x1b[0m',
  https: '\x1b[44mHTTPS\x1b[0m',
}

app.prepare().then(() => {

  createHttpsServer(sslOptions, async (req, res) => {
    const parsedUrl = req.url ? parse(req.url, true) : { pathname: '/', query: {} }
    await handle(req, res, parsedUrl)
  }).listen(httpsPort, () => {
    console.log(`${strings.ready} ${strings.https} https://${hostname}:${httpsPort}`)
  })
})
