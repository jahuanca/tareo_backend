'use-strict'

const { v4 } = require('uuid')

const requestIdMiddleware = (req, res, next) => {
  req.id = v4()
  next()
}

module.exports = requestIdMiddleware
