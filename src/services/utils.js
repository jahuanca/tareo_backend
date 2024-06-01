const { formatInTimeZone } = require('date-fns-tz')
const ErrorNotFound = require('./error/models/ErrorNotFound')
const ErrorServer = require('./error/models/ErrorServer')

const getDateWithZone = (date) => {
  return formatInTimeZone(
    new Date(date), 'America/Lima', 'yyyy-MM-dd HH:mm:ss zzz'
  )
}

const asyncCatch = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(new ErrorServer(err)))
}

const get = (promise) => {
  return promise.then(data => {
    return [null, data]
  })
    .catch(err => [err])
}

const getError = (promise) => {
  return promise.then(data => {
    if (data == null) {
      return [new ErrorNotFound('valores nulos')]
    }
    return [null, data]
  })
    .catch(err => {
      return [
        new ErrorServer(err)
      ]
    })
}

function getNowTime (date) {
  // for server
  return new Date(date.getTime() - 0 * 3600000)
  // for local
  // return new Date(date.getTime() - 5  * 3600000)
}

module.exports = {
  getDateWithZone,
  get,
  getError,
  asyncCatch,
  getNowTime
}
