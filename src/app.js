'use strict'
const express = require('express')
const routesOfModules=require('./config/routesWithModels')
const app = express()
const config = require('./config')
const logger= require('./config/logger')

const http = require('http').createServer(app);
const io = require('socket.io')(http);

const cors=require('./config/cors')
const swagger=require('./config/swagger')

app.set('socketio', io);

//midlewares
app.use(
  require('./config/middlewares')
);
app.use(swagger.path, swagger.serve, swagger.setUp)
app.use(cors)
app.use(express.static('./public'));
for (const route of routesOfModules) app.use(route[0], route[1])
app.use('**', (req, res)=> res.status(500).json({message: `Ruta no encontrada`}));

app.use(
  require('./config/afterMiddleware')
);

io.on('connection', function (socket) {});
app.set('socketV', io);
app.set('trust proxy', true);

http.listen(
  config.port, 
  () => logger.info(`API REST, corriendo en el puerto: ${config.port}`)
)