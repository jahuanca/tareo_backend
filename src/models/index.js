'use strict'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../config/config.json')[env]
const DataTypes = require('sequelize/lib/data-types')
const db = {}

let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config)
}

/* const moment= require('moment')
Sequelize.DATE.prototype._sanitize = function _sanitize(value) {
  if (typeof value === 'string') { // maybe check if string date is valid
    return moment(value).utc(false).toDate() // I use useUTC: false
  }
  return value
} */
DataTypes.DATE.prototype._stringify = function _stringify (date, options) {
  date = this._applyTimezone(date, options)
  return date.format('YYYY-MM-DD HH:mm:ss.SSS')
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
