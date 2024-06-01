'use strict'
const express = require('express')
const routesOfModules = require('./config/routesWithModels')
const app = express()
const config = require('./config')
const logger = require('./config/logger')

const http = require('http').createServer(app)
const io = require('socket.io')(http)

const cors = require('./config/cors')
const swagger = require('./services/swagger')
const ErrorHandler = require('./services/error/ErrorHandle')
const ErrorNotFound = require('./services/error/models/ErrorNotFound')

app.set('socketio', io)

// midlewares
app.use(require('./middlewares/requestIdMiddleware'))
app.use(
  require('./middlewares/middlewares')
)
app.use(swagger.path, swagger.serve, swagger.setUp)
app.use(cors)
app.use(express.static('./public'))
for (const route of routesOfModules) app.use(route[0], route[1])

app.use('*', (req, res, next) => next(new ErrorNotFound(`Requested path ${req.path} not found`)))

app.use(ErrorHandler.handle())

/* process.on("uncaughtException", (err) => {
  console.log(err.name, err.message)
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");  process.exit(1)
}) */

/* process.on("unhandledRejection", (reason, promise) => {
  console.log(reason.name, reason.message)
  console.log("UNHANDLED REJECTION! 💥 Shutting down...")
  process.exit(1)
  throw reason
}) */

io.on('connection', function (socket) { })
app.set('socketV', io)
app.set('trust proxy', true)

http.listen(
  config.port,
  () => logger.info(`API REST, corriendo en el puerto: ${config.port}`)
)
