'use strict'
const logger = require('../config/logger')
const models = require('../models')

async function getEsparragoAgrupaPersonals (req, res) {
  const [err, esparragoAgrupaPersonals] = await get(models.EsparragoAgrupaPersonal.findAll({
    /* where:{estado: 'A'}, */
    include: [{ all: true }]
  }))
  if (err) return res.status(500).json({ message: `${err}` })
  if (esparragoAgrupaPersonals == null) return res.status(404).json({ message: 'EsparragoAgrupaPersonals nulos' })
  console.log(esparragoAgrupaPersonals.length)
  res.status(200).json(esparragoAgrupaPersonals)
}

async function getEsparragoAgrupaPersonalByLimitAndOffset (req, res) {
  const [err, esparragoAgrupaPersonal] = await get(models.EsparragoAgrupaPersonal.findAll({
    include: [{ all: true }],
    offset: req.query.offset ? parseInt(req.query.offset) : 0,
    limit: req.query.limit ? parseInt(req.query.limit) : 10
  }))
  if (err) {
    logger.error(`500 GET getEsparragoAgrupaPersonalByLimitAndOffset, ${err}.`)
    return res.status(500).json({ message: `${err}` })
  }
  if (esparragoAgrupaPersonal == null) {
    logger.error('404 GET getEsparragoAgrupaPersonalByLimitAndOffset, valor nulo.')
    return res.status(404).json({ message: 'personal_empresas nulos' })
  }
  logger.info(`200 GET getEsparragoAgrupaPersonalByLimitAndOffset, limit: ${req.query.limit} y offset: ${req.query.offset}.`)
  res.status(200).json(esparragoAgrupaPersonal)
}

async function getEsparragoAgrupaPersonal (req, res) {
  const [err, esparragoAgrupaPersonal] = await get(models.EsparragoAgrupaPersonal.findOne({
    where: { id: req.params.id, estado: 'A' },
    include: [{ all: true }]
  }))
  console.log(err)
  if (err) return res.status(500).json({ message: `${err}` })
  if (esparragoAgrupaPersonal == null) return res.status(404).json({ message: 'EsparragoAgrupaPersonals nulos' })
  res.status(200).json(esparragoAgrupaPersonal)
}

async function createEsparragoAgrupaPersonal (req, res) {
  const [err, esparragoAgrupaPersonal] = await get(models.EsparragoAgrupaPersonal.create({
    // all fields to insert

    accion: 'I',
    accion_usuario: 'Creo un nuevo esparragoAgrupaPersonal.',
    ip: req.ip,
    usuario: 0
  }))
  if (err) return res.status(500).json({ message: `${err}` })
  if (esparragoAgrupaPersonal == null) return res.status(404).json({ message: 'EsparragoAgrupaPersonals nulos' })
  res.status(200).json(esparragoAgrupaPersonal)
}

async function updateEsparragoAgrupaPersonal (req, res) {
  const [err, esparragoAgrupaPersonal] = await get(models.EsparragoAgrupaPersonal.update({
    // all fields to update

    accion: 'U',
    accion_usuario: 'Edito un esparragoAgrupaPersonal.',
    ip: req.ip,
    usuario: 0
  }, {
    where: {
      id: req.body.id, estado: 'A'
    },
    individualHooks: true,
    validate: false
  }))
  if (err) return res.status(500).json({ message: `${err}` })
  if (esparragoAgrupaPersonal == null) return res.status(404).json({ message: 'EsparragoAgrupaPersonals nulos' })
  res.status(200).json(esparragoAgrupaPersonal[1][0].dataValues)
}

async function deleteEsparragoAgrupaPersonal (req, res) {
  const [err, esparragoAgrupaPersonal] = await get(models.EsparragoAgrupaPersonal.update({
    estado: 'I',

    accion_usuario: 'Elimino un esparragoAgrupaPersonal.',
    accion: 'D',
    ip: req.ip,
    usuario: 0
  }, {
    where: {
      id: req.params.id, estado: 'A'
    },
    individualHooks: true
  }))
  if (err) return res.status(500).json({ message: `${err}` })
  if (esparragoAgrupaPersonal == null) return res.status(404).json({ message: 'EsparragoAgrupaPersonals nulos' })
  res.status(200).json(esparragoAgrupaPersonal[1][0].dataValues)
}

async function getEsparragoAgrupaPersonalCount (req, res) {
  const [err, esparragoAgrupaPersonal] = await get(models.EsparragoAgrupaPersonal.count({
    include: [{ all: true }]
  }))
  if (err) return res.status(500).json({ message: `${err}` })
  if (esparragoAgrupaPersonal == null) return res.status(404).json({ message: 'esparragoAgrupaPersonal nulos' })
  res.status(200).json(esparragoAgrupaPersonal)
}

function get (promise) {
  return promise.then(data => {
    return [null, data]
  })
    .catch(err => [err])
}

module.exports = {
  getEsparragoAgrupaPersonals,
  getEsparragoAgrupaPersonal,
  createEsparragoAgrupaPersonal,
  updateEsparragoAgrupaPersonal,
  deleteEsparragoAgrupaPersonal,
  getEsparragoAgrupaPersonalByLimitAndOffset,
  getEsparragoAgrupaPersonalCount
}
