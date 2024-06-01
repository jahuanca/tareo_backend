const ErrorApi = require('../base/ErrorApi')
const { ERROR_APP } = require('../base/ErrorCodeConstants')
const { NOT_FOUND } = require('http-status-codes').StatusCodes

class ErrorNotFound extends ErrorApi {
  constructor (message) {
    super(NOT_FOUND, ERROR_APP, message)
  }
}

module.exports = ErrorNotFound
