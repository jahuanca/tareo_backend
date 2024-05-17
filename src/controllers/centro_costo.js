'use strict'
const models = require('../models')
const logger = require('./../config/logger')

async function getCentroCostoCount (req, res) {
  const [err, centroCosto] = await get(models.Centro_Costo.count({
    where: { activo: true }
  }))
  if (err) return res.status(500).json({ message: `${err}` })
  if (centroCosto == null) return res.status(404).json({ message: 'centro_costo nulos' })
  res.status(200).json(centroCosto)
}

async function getCentroCostosByLimitAndOffset (req, res) {
  const [err, centroCosto] = await get(models.Centro_Costo.findAll({
    where: { activo: true },
    offset: req.query.offset ? parseInt(req.query.offset) : 0,
    limit: req.query.limit ? parseInt(req.query.limit) : 10
  }))
  if (err) {
    logger.error(`500 GET getCentroCostosByLimitAndOffset, ${err}.`)
    return res.status(500).json({ message: `${err}` })
  }
  if (centroCosto == null) {
    logger.error('404 GET getCentroCostosByLimitAndOffset, valor nulo.')
    return res.status(404).json({ message: 'personal_empresas nulos' })
  }
  logger.info(`200 GET getCentroCostosByLimitAndOffset, limit: ${req.query.limit} y offset: ${req.query.offset}.`)
  res.status(200).json(centroCosto)
}

async function getCentroCostos (req, res) {
  const [err, centroCosto] = await get(models.Centro_Costo.findAll({
    where: { activo: true }
  }))
  if (err) {
    logger.error(`500 GET GET_CENTRO_COSTOS, ${err}.`)
    return res.status(500).json({ message: `${err}` })
  }
  if (centroCosto == null) {
    logger.error('404 GET GET_CENTRO_COSTOS, valor nulo.')
    return res.status(404).json({ message: 'Centro_Costos nulos' })
  }
  logger.info(`200 GET GET_CENTRO_COSTOS ${centroCosto.length} values.`)
  res.status(200).json(centroCosto)
}

async function getCentro_Costo (req, res) {
  const [err, centroCosto] = await get(models.Centro_Costo.findOne({
    where: { idcentrocosto: req.params.id },
    include: [{ all: true }]
  }))
  console.log(err)
  if (err) return res.status(500).json({ message: 'err' })
  if (centroCosto == null) return res.status(404).json({ message: 'Centro_Costos nulos' })
  res.status(200).json(centroCosto)
}

async function createCentro_Costo (req, res) {
  const [err, centro_costo] = await get(models.Centro_Costo.create({
    // all fields to insert

    accion: 'I',
    accion_usuario: 'Creo un nuevo centro_costo.',
    ip: req.ip,
    usuario: 0
  }))
  if (err) return res.status(500).json({ message: 'err' })
  if (centro_costo == null) return res.status(404).json({ message: 'Centro_Costos nulos' })
  res.status(200).json(centro_costo)
}

async function updateCentro_Costo (req, res) {
  const [err, centro_costo] = await get(models.Centro_Costo.update({
    // all fields to update

    accion: 'U',
    accion_usuario: 'Edito un centro_costo.',
    ip: req.ip,
    usuario: 0
  }, {
    where: {
      id: req.body.id, estado: 'A'
    },
    individualHooks: true,
    validate: false
  }))
  if (err) return res.status(500).json({ message: 'err' })
  if (centro_costo == null) return res.status(404).json({ message: 'Centro_Costos nulos' })
  res.status(200).json(centro_costo[1][0].dataValues)
}

async function deleteCentro_Costo (req, res) {
  const [err, centro_costo] = await get(models.Centro_Costo.update({
    estado: 'I',

    accion_usuario: 'Elimino un centro_costo.',
    accion: 'D',
    ip: req.ip,
    usuario: 0
  }, {
    where: {
      id: req.params.id, estado: 'A'
    },
    individualHooks: true
  }))
  if (err) return res.status(500).json({ message: 'err' })
  if (centro_costo == null) return res.status(404).json({ message: 'Centro_Costos nulos' })
  res.status(200).json(centro_costo[1][0].dataValues)
}

function get (promise) {
  return promise.then(data => {
    return [null, data]
  })
    .catch(err => [err])
}

module.exports = {
  getCentroCostosByLimitAndOffset,
  getCentroCostos,
  getCentro_Costo,
  createCentro_Costo,
  updateCentro_Costo,
  deleteCentro_Costo,
  getCentroCostoCount
}
