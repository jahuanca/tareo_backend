'use-strict'
const fs = require('file-system')
const { INTERNAL_SERVER_ERROR } = require('http-status-codes').StatusCodes

const logger = require('../../config/logger')
const ErrorServer = require('./models/ErrorServer')

class ErrorHandler {
  static handle = () => {
    return async (err, req, res, next) => {
      const statusCode = err.statusCode || INTERNAL_SERVER_ERROR
      if (err instanceof ErrorServer) {
        createFileStack(req.id, err.stack ?? '')
      }
      logger.error(`${req.id}:  ${err.message}`)
      res.status(statusCode).send({
        requestID: req.id,
        code: err.code,
        message: err.message
      })
    }
  }
}

const createFileStack = (name, data) => fs.writeFileSync(`./logs/stacks/${name}.txt`, data)

module.exports = ErrorHandler
