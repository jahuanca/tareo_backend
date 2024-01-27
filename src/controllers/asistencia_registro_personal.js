'use strict'
const models = require('../models')
const logger = require('./../config/logger')

async function getAsistenciaRegistroPersonalsCount (req, res) {
  const [err, asistenciaRegistroPersonals] = await get(models.AsistenciaRegistroPersonal.count({
    where: { estado: 'A' }
  }))
  if (err) {
    logger.error(`500 GET getAsistenciaRegistroPersonalsCount, ${err}.`)
    return res.status(500).json({ message: `${err}` })
  }
  if (asistenciaRegistroPersonals == null) {
    logger.error('404 GET getAsistenciaRegistroPersonalsCount, asistenciaRegistroPersonals nulos.')
    return res.status(404).json({ message: 'asistenciaRegistroPersonals nulos' })
  }
  logger.info(`200 GET getAsistenciaRegistroPersonalsCount, ${asistenciaRegistroPersonals.length} values.`)
  res.status(200).json(asistenciaRegistroPersonals)
}

async function getAsistenciaRegistroPersonalsByLimitAndOffset (req, res) {
  const [err, asistenciaRegistroPersonals] = await get(models.AsistenciaRegistroPersonal.findAll({
    where: { estado: 'A' },
    offset: req.params.offset ? parseInt(req.params.offset) : 0,
    limit: req.params.limit ? parseInt(req.params.limit) : 10
  }))
  if (err) {
    logger.error(`500 GET getAsistenciaRegistroPersonalsByLimitAndOffset, ${err}.`)
    return res.status(500).json({ message: `${err}` })
  }
  if (asistenciaRegistroPersonals == null) {
    logger.error('404 GET getAsistenciaRegistroPersonalsByLimitAndOffset, asistenciaRegistroPersonals nulos.')
    return res.status(404).json({ message: '' })
  }
  logger.info(`200 GET getAsistenciaRegistroPersonalsByLimitAndOffset, ${asistenciaRegistroPersonals.length} values.`)
  res.status(200).json(asistenciaRegistroPersonals)
}

async function getAsistenciaRegistroPersonals (req, res) {
  const querys = req.query
  querys.estado = 'A'
  console.log(querys)
  const [err, asistenciaRegistroPersonals] = await get(models.AsistenciaRegistroPersonal.findAll({
    where: querys,
    order: [['idasistencia', 'DESC']],
    include: [{ all: true }]
  }))
  if (err) {
    logger.error(`500 GET getAsistenciaRegistroPersonals, ${err}.`)
    return res.status(500).json({ message: `${err}` })
  }
  if (asistenciaRegistroPersonals == null) {
    logger.error('404 GET getAsistenciaRegistroPersonals, asistenciaRegistroPersonals nulos.')
    return res.status(404).json({ message: 'asistenciaRegistroPersonals nulos' })
  }
  logger.info(`200 GET getAsistenciaRegistroPersonals, ${asistenciaRegistroPersonals.length} values.`)
  res.status(200).json(asistenciaRegistroPersonals)
}

async function getAsistenciaRegistroPersonal (req, res) {
  const [err, asistenciaRegistroPersonal] = await get(models.AsistenciaRegistroPersonal.findOne({
    where: { id: req.params.id, estado: 'A' },
    include: [{ all: true }]
  }))
  if (err) {
    logger.error(`500 GET getAsistenciaRegistroPersonal, ${err}.`)
    return res.status(500).json({ message: `${err}` })
  }
  if (asistenciaRegistroPersonal == null) {
    logger.error('400 GET getAsistenciaRegistroPersonal, asistenciaRegistroPersonal nulos.')
    return res.status(404).json({ message: 'asistenciaRegistroPersonal nulos' })
  }
  logger.info(`200 GET getAsistenciaRegistroPersonal, ${asistenciaRegistroPersonal.length} values.`)
  res.status(200).json(asistenciaRegistroPersonal)
}

async function createAsistenciaRegistroPersonal (req, res) {
  const [err, asistenciaRegistroPersonal] = await get(models.AsistenciaRegistroPersonal.create({
    idasistenciaturno: req.body.idasistenciaturno,
    codigoempresa: req.body.codigoempresa,
    nrodocumento: req.body.nrodocumento,
    tipomovimiento: req.body.tipomovimiento,
    idubicacionentrada: req.body.idubicacionentrada,
    idubicacionsalida: req.body.idubicacionsalida,
    idturno: req.body.idturno,
    fechaturno: req.body.fechaturno,
    idusuario: req.body.idusuario,
    fechamod: req.body.fechamod,
    fechaentrada: getNowTime(new Date()),
    horaentrada: getNowTime(new Date()),
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
    logger.error('400 GET createAsistenciaRegistroPersonal, asistenciaRegistroPersonal nulos.')
    return res.status(404).json({ message: 'asistenciaRegistroPersonal nulos' })
  }
  logger.info(`200 GET createAsistenciaRegistroPersonal, ${asistenciaRegistroPersonal.length} values.`)
  res.status(200).json(asistenciaRegistroPersonal)
}

async function updateAsistenciaRegistroPersonal (req, res) {
  const [errU, valueToUpdate] = await get(
    models.AsistenciaRegistroPersonal.findOne(
      {
        where: { idasistencia: req.body.idasistencia }
      }
    )
  )

  if (errU) {
    logger.error(`500 PUT updateAsistenciaRegistroPersonal, ${errU}.`)
    return res.status(500).json({ message: `${errU}` })
  }

  if (valueToUpdate) {
    const horaMinima = addMinutes(valueToUpdate.horaentrada, 5)
    if (
      horaMinima.getTime() > Date.now()
    ) {
      logger.error('500 PUT updateAsistenciaRegistroPersonal, Debe esperar 5 minutos.')
      return res.status(500).json({ message: 'Debe esperar 5 minutos.' })
    }
  }

  const [err, asistenciaRegistroPersonal] = await get(models.AsistenciaRegistroPersonal.update({
    tipomovimiento: req.body.tipomovimiento,
    fechamod: req.body.fechamod,
    fechasalida: getNowTime(new Date()),
    horasalida: getNowTime(new Date()),

    /* horasalida: req.body.horasalida,
    fechasalida: req.body.fechasalida, */

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
    logger.error('404 PUT updateAsistenciaRegistroPersonal, asistenciaRegistroPersonal nulos.')
    return res.status(404).json({ message: 'asistenciaRegistroPersonals nulos' })
  }
  logger.info(`200 PUT updateAsistenciaRegistroPersonal, ${asistenciaRegistroPersonal[1][0].dataValues.idasistencia} values.`)
  res.status(200).json(asistenciaRegistroPersonal[1][0].dataValues)
}

async function deleteAsistenciaRegistroPersonal (req, res) {
  const [err, asistenciaRegistroPersonal] = await get(models.AsistenciaRegistroPersonal.update({
    estado: 'I',

    accion_usuario: 'Elimino un asistenciaRegistroPersonal.',
    accion: 'D',
    ip: req.ip,
    usuario: 0
  }, {
    where: {
      idasistencia: req.params.id
    },
    individualHooks: true
  }))
  if (err) {
    logger.error(`500 DELETE deleteAsistenciaRegistroPersonal, ${err}.`)
    return res.status(500).json({ message: `${err}` })
  }
  if (asistenciaRegistroPersonal == null) {
    logger.error('404 DELETE deleteAsistenciaRegistroPersonal, asistenciaRegistroPersonal nulos.')
    return res.status(404).json({ message: 'AsistenciaRegistroPersonal nulos' })
  }
  logger.info(`200 DELETE deleteAsistenciaRegistroPersonal, ${asistenciaRegistroPersonal[1][0].dataValues} values.`)
  res.status(200).json(asistenciaRegistroPersonal[1][0].dataValues)
}

async function registrar (req, res) {
  console.log(req.body.idasistenciaturno)
  const [err, registro] = await get(models.AsistenciaRegistroPersonal.findOne({
    where: {
      idasistenciaturno: req.body.idasistenciaturno,
      codigoempresa: req.body.codigoempresa,
      horasalida: null,
      estado: 'A'
    }
  }))
  if (err) {
    logger.error(`500 POST registrar, ${err}.`)
    return res.status(500).json({ message: `${err}` })
  }
  if (registro == null) {
    // creacion
    console.log('Creacion')
    const [err, asistenciaRegistroPersonal] = await get(models.AsistenciaRegistroPersonal.create({
      idasistenciaturno: req.body.idasistenciaturno,
      nrodocumento: req.body.nrodocumento,
      codigoempresa: req.body.codigoempresa,
      tipomovimiento: 'I',
      idubicacionentrada: req.body.idubicacionentrada,
      idubicacionsalida: req.body.idubicacionsalida,
      idturno: req.body.idturno,
      fechaturno: req.body.fechaturno,
      idusuario: req.body.idusuario,
      fechamod: req.body.fechamod,

      fechaentrada: getNowTime(new Date()),
      horaentrada: getNowTime(new Date()),

      accion: 'I',
      accion_usuario: 'Creo un nuevo asistenciaRegistroPersonal.',
      ip: req.ip,
      usuario: 0
    }))
    if (err) {
      logger.error(`500 POST registrar, ${err}.`)
      return res.status(500).json({ message: `${err}` })
    }
    if (asistenciaRegistroPersonal == null) {
      logger.error('400 POST registrar, asistenciaRegistroPersonal nulos.')
      return res.status(404).json({ message: 'asistenciaRegistroPersonal nulos' })
    }
    logger.info(`200 POST registrar, ${asistenciaRegistroPersonal.idasistencia} values.`)
    return res.status(200).json(asistenciaRegistroPersonal)
  } else {
    console.log('Modificacion')
    // modificacion
    const [errU, valueToUpdate] = await get(
      models.AsistenciaRegistroPersonal.findOne(
        {
          where: { idasistencia: registro.idasistencia }
        }
      )
    )

    if (errU) {
      logger.error(`500 POST registrar, ${errU}.`)
      return res.status(500).json({ message: `${errU}` })
    }

    if (valueToUpdate) {
      const horaMinima = addMinutes(valueToUpdate.horaentrada, 5)
      console.log('Min:' + horaMinima.getTime())
      console.log('Act:' + Date.now())
      if (
        horaMinima.getTime() > Date.now()
      ) {
        logger.error('500 PUT updateAsistenciaRegistroPersonal, Debe esperar 5 minutos.')
        console.log('es mayor')
        return res.status(500).json({ message: 'Debe esperar 5 minutos.' })
      }
    }

    const [err, asistenciaRegistroPersonal] = await get(models.AsistenciaRegistroPersonal.update({
      tipomovimiento: 'S',
      fechamod: req.body.fechamod,
      fechasalida: getNowTime(new Date()),
      horasalida: getNowTime(new Date()),
      accion: 'U',
      accion_usuario: 'Edito un asistenciaRegistroPersonal.',
      ip: req.ip,
      usuario: 0
    }, {
      where: {
        idasistencia: registro.idasistencia
      },
      individualHooks: true,
      validate: false
    }))
    if (err) {
      logger.error(`500 PUT updateAsistenciaRegistroPersonal, ${err}.`)
      return res.status(500).json({ message: `${err}` })
    }
    if (asistenciaRegistroPersonal[0] === 0) {
      logger.error('404 PUT updateAsistenciaRegistroPersonal, no se encontro asistenciaRegistroPersonal para modfiicar')
      return res.status(404).json({ message: 'asistenciaRegistroPersonals nulos' })
    }
    logger.info(`200 PUT updateAsistenciaRegistroPersonal, ${asistenciaRegistroPersonal[1][0].dataValues.idasistencia} values.`)
    return res.status(200).json(asistenciaRegistroPersonal[1][0].dataValues)
  }
}

function get (promise) {
  return promise.then(data => {
    return [null, data]
  })
    .catch(err => [err])
}

module.exports = {
  getAsistenciaRegistroPersonalsCount,
  getAsistenciaRegistroPersonalsByLimitAndOffset,
  getAsistenciaRegistroPersonals,
  getAsistenciaRegistroPersonal,
  createAsistenciaRegistroPersonal,
  updateAsistenciaRegistroPersonal,
  deleteAsistenciaRegistroPersonal,
  registrar
}

function addMinutes (date, minutes) {
  // return new Date(date.getTime() + minutes*60000 + 10 * 3600000 );
  return new Date(date.getTime() + minutes * 60000 + 5 * 3600000)
}

function getNowTime (date) {
  return new Date(date.getTime() - 5 * 3600000)
}
