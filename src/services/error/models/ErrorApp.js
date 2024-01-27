const ErrorApi = require('./../base/ErrorApi')
const { ERROR_APP } = require('./../base/ErrorCodeConstants')

class ErrorApp extends ErrorApi {
  constructor (statusCode, message) {
    super(statusCode, ERROR_APP, message)
  }
}
module.exports = ErrorApp
