'use-strict'
const { urlencoded, json } = require('body-parser')
const uuid = require('uuid')
const morgan = require('morgan')

// config-of-bodyParser
const bodyParserUrlEncoded =
    urlencoded({
      extended: false,
      limit: '50mb'
    })

const bodyParserJson = json({
  limit: '50mb'
})

const crossMiddleware = (req, res, next) => {
  // set headers to allow cross origin request.
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
}

const beforeMiddleware = (req, res, next) => {
  req.id = uuid.v4()
  next()
}

const afterMiddleware = (req, res, next) => {
  console.log('despues de responder')
  next()
}

module.exports = [
  crossMiddleware,
  bodyParserJson,
  bodyParserUrlEncoded,
  beforeMiddleware,
  morgan('tiny')
]
