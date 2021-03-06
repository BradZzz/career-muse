require('dotenv').config()

const path = require('path')
const express = require('express')
const request = require('request')
const dn = require('dn')
const app = express()
const PORT = process.env.PORT || 3000

// using webpack-dev-server and middleware in development environment
if(process.env.NODE_ENV !== 'production') {
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const webpack = require('webpack')
  const config = require('./webpack.config')
  const compiler = webpack(config)

  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
  app.use(webpackHotMiddleware(compiler))
}

app.use(express.static(path.join(__dirname, 'dist')))

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/dist/index.html')
})

//This gets the list of domains
app.get('/smeta', function(req, res) {
  request('https://s3.amazonaws.com/cmresumeviewer/text_to_use.json', function (error, response, body) {
    if (error) {
      res.send(error)
    } else {
      //console.log(body)
      res.send(body)
    }
  })
})

app.listen(PORT, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT)
  }
})