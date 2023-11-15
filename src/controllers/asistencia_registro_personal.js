'use strict'
const models = require('../models')
const logger = require('./../config/logger')

async function getAsistenciaRegistroPersonalsCount(req, res) {
  let [err, asistenciaRegistroPersonals] = await get(models.AsistenciaRegistroPersonal.count({
    where: { estado: 'A' },
  }))
  if (err) {
    logger.error(`500 GET getAsistenciaRegistroPersonalsCount, ${err}.`)
    return res.status(500).json({ message: `${err}` })
  }
  if (asistenciaRegistroPersonals == null) {
    logger.error(`404 GET getAsistenciaRegistroPersonalsCount, asistenciaRegistroPersonals nulos.`)
    return res.status(404).json({ message: `asistenciaRegistroPersonals nulos` })
  }
  logger.info(`200 GET getAsistenciaRegistroPersonalsCount, ${asistenciaRegistroPersonals.length} values.`)
  res.status(200).json(asistenciaRegistroPersonals)
}

async function getAsistenciaRegistroPersonalsByLimitAndOffset(req, res) {
  let [err, asistenciaRegistroPersonals] = await get(models.AsistenciaRegistroPersonal.findAll({
    where: { estado: 'A' },
    offset: req.params.offset ? parseInt(req.params.offset) : 0,
    limit: req.params.limit ? parseInt(req.params.limit) : 10,
  }))
  if (err) {
    logger.error(`500 GET getAsistenciaRegistroPersonalsByLimitAndOffset, ${err}.`)
    return res.status(500).json({ message: `${err}` })
  }
  if (asistenciaRegistroPersonals == null) {
    logger.error(`404 GET getAsistenciaRegistroPersonalsByLimitAndOffset, asistenciaRegistroPersonals nulos.`)
    return res.status(404).json({ message: `asistenciaRegistroPersonals nulos` })
  }
  logger.info(`200 GET getAsistenciaRegistroPersonalsByLimitAndOffset, ${asistenciaRegistroPersonals.length} values.`)
  res.status(200).json(asistenciaRegistroPersonals)
}

async function getAsistenciaRegistroPersonals(req, res) {
  let querys= req.query;
  querys.estado= 'A';
  console.log(querys)
  let [err, asistenciaRegistroPersonals] = await get(models.AsistenciaRegistroPersonal.findAll({
    where: querys,
    include: [{ all: true }]
  }))
  if (err) {
    logger.error(`500 GET getAsistenciaRegistroPersonals, ${err}.`)
    return res.status(500).json({ message: `${err}` })
  }
  if (asistenciaRegistroPersonals == null) {
    logger.error(`404 GET getAsistenciaRegistroPersonals, asistenciaRegistroPersonals nulos.`)
    return res.status(404).json({ message: `asistenciaRegistroPersonals nulos` })
  }
  logger.info(`200 GET getAsistenciaRegistroPersonals, ${asistenciaRegistroPersonals.length} values.`)
  res.status(200).json(asistenciaRegistroPersonals)
}

async function getAsistenciaRegistroPersonal(req, res) {
  let [err, asistenciaRegistroPersonal] = await get(models.AsistenciaRegistroPersonal.findOne({
    where: { id: req.params.id, estado: 'A' },
    include: [{ all: true }]
  }))
  if (err) {
    logger.error(`500 GET getAsistenciaRegistroPersonal, ${err}.`)
    return res.status(500).json({ message: `${err}` })
  }
  if (asistenciaRegistroPersonal == null) {
    logger.error(`400 GET getAsistenciaRegistroPersonal, asistenciaRegistroPersonal nulos.`)
    return res.status(404).json({ message: `asistenciaRegistroPersonal nulos` })
  }
  logger.info(`200 GET getAsistenciaRegistroPersonal, ${asistenciaRegistroPersonal.length} values.`)
  res.status(200).json(asistenciaRegistroPersonal)
}

async function createAsistenciaRegistroPersonal(req, res) {
  let [err, asistenciaRegistroPersonal] = await get(models.AsistenciaRegistroPersonal.create({
    idasistenciaturno: req.body.idasistenciaturno,
    codigoempresa: req.body.codigoempresa,
    tipomovimiento: req.body.tipomovimiento,
    fechaentrada: req.body.fechaentrada,
    horaentrada: req.body.horaentrada,
    idubicacionentrada: req.body.idubicacionentrada,
    fechasalida: req.body.fechasalida,
    horasalida: req.body.horasalida,
    idubicacionsalida: req.body.idubicacionsalida,
    idturno: req.body.idturno,
    fechaturno: req.body.fechaturno,
    idusuario: req.body.idusuario,
    fechamod: req.body.fechamod,

    accion: 'I',
    accion_usuario: 'Creo un nuevo asistenciaRegistroPersonal.',
    ip: req.ip,
    usuario: 0
  }))
  if (err) {
    logger.error(`500 GET createAsistenciaRegistroPersonal, ${err}.`)
    return res.status(500).json({ message: `${err}` })
  }
  if (asistenciaRegistroPersonal == null) {
    logger.error(`400 GET createAsistenciaRegistroPersonal, asistenciaRegistroPersonal nulos.`)
    return res.status(404).json({ message: `asistenciaRegistroPersonal nulos` })
  }
  logger.info(`200 GET createAsistenciaRegistroPersonal, ${asistenciaRegistroPersonal.length} values.`)
  res.status(200).json(asistenciaRegistroPersonal)
}

async function updateAsistenciaRegistroPersonal(req, res) {
  let [err, asistenciaRegistroPersonal] = await get(models.AsistenciaRegistroPersonal.update({
    horasalida: req.body.horasalida,
    tipomovimiento: req.body.tipomovimiento,
    fechasalida: req.body.fechasalida,
    fechamod: req.body.fechamod,

    accion: 'U',
    accion_usuario: 'Edito un asistenciaRegistroPersonal.',
    ip: req.ip,
    usuario: 0
  }, {
    where: {
      idasistencia: req.body.idasistencia, estado: 'A'
    },
    individualHooks: true,
    validate: false
  }))
  if (err) {
    logger.error(`500 PUT updateAsistenciaRegistroPersonal, ${err}.`)
    return res.status(500).json({ message: `${err}` })
  }
  if (asistenciaRegistroPersonal == null) {
    logger.error(`404 PUT updateAsistenciaRegistroPersonal, asistenciaRegistroPersonal nulos.`)
    return res.status(404).json({ message: `asistenciaRegistroPersonals nulos` })
  }
  logger.info(`200 PUT updateAsistenciaRegistroPersonal, ${asistenciaRegistroPersonal[1][0].dataValues.length} values.`)
  res.status(200).json(asistenciaRegistroPersonal[1][0].dataValues)
}

async function deleteAsistenciaRegistroPersonal(req, res) {
  let [err, asistenciaRegistroPersonal] = await get(models.AsistenciaRegistroPersonal.update({
    estado: 'I',

    accion_usuario: 'Elimino un asistenciaRegistroPersonal.',
    accion: 'D',
    ip: req.ip,
    usuario: 0
  }, {
    where: {
      id: req.params.id, estado: 'A'
    },
    individualHooks: true
  }))
  if (err) {
    logger.error(`500 DELETE getAsistenciaRegistroPersonalsCount, ${err}.`)
    return res.status(500).json({ message: `${err}` })
  }
  if (asistenciaRegistroPersonal == null) {
    logger.error(`404 DELETE deleteAsistenciaRegistroPersonal, asistenciaRegistroPersonal nulos.`)
    return res.status(404).json({ message: `AsistenciaRegistroPersonal nulos` })
  }
  logger.info(`200 DELETE deleteAsistenciaRegistroPersonal, ${asistenciaRegistroPersonal[1][0].length} values.`)
  res.status(200).json(asistenciaRegistroPersonal[1][0].dataValues)
}

function get(promise) {
  return promise.then(data => {
    return [null, data];
  })
    .catch(err => [err]);
}

module.exports = {
  getAsistenciaRegistroPersonalsCount,
  getAsistenciaRegistroPersonalsByLimitAndOffset,
  getAsistenciaRegistroPersonals,
  getAsistenciaRegistroPersonal,
  createAsistenciaRegistroPersonal,
  updateAsistenciaRegistroPersonal,
  deleteAsistenciaRegistroPersonal
}