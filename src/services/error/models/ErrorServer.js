const ErrorApi = require('../base/ErrorApi')
const { ERROR_SERVER } = require('../base/ErrorCodeConstants')
const { INTERNAL_SERVER_ERROR } = require('http-status-codes').StatusCodes

class ErrorServer extends ErrorApi {
  constructor (message) {
    super(INTERNAL_SERVER_ERROR, ERROR_SERVER, message)
  }
}

module.exports = ErrorServer
