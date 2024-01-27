'use strict'
const models = require('../models')
const logger = require('./../config/logger')
const { transform } = require('dottie')

async function getAsistenciaFechaTurnosCount (req, res) {
  const [err, AsistenciaFechaTurnos] = await get(models.AsistenciaFechaTurno.count({
    where: { estado: 'A' }
  }))
  if (err) {
    logger.error(`500 GET getAsistenciaFechaTurnosCount, ${err}.`)
    return res.status(500).json({ message: `${err}` })
  }
  if (AsistenciaFechaTurnos == null) {
    logger.error('404 GET getAsistenciaFechaTurnosCount, AsistenciaFechaTurnos nulos.')
    return res.status(404).json({ message: 'AsistenciaFechaTurnos nulos' })
  }
  logger.info(`200 GET getAsistenciaFechaTurnosCount, ${AsistenciaFechaTurnos.length} values.`)
  res.status(200).json(AsistenciaFechaTurnos)
}

async function getAsistenciaFechaTurnosByLimitAndOffset (req, res) {
  const [err, AsistenciaFechaTurnos] = await get(models.AsistenciaFechaTurno.findAll({
    where: { estado: 'A' },
    offset: req.params.offset ? parseInt(req.params.offset) : 0,
    limit: req.params.limit ? parseInt(req.params.limit) : 10
  }))
  if (err) {
    logger.error(`500 GET getAsistenciaFechaTurnosByLimitAndOffset, ${err}.`)
    return res.status(500).json({ message: `${err}` })
  }
  if (AsistenciaFechaTurnos == null) {
    logger.error('404 GET getAsistenciaFechaTurnosByLimitAndOffset, AsistenciaFechaTurnos nulos.')
    return res.status(404).json({ message: 'AsistenciaFechaTurnos nulos' })
  }
  logger.info(`200 GET getAsistenciaFechaTurnosByLimitAndOffset, ${AsistenciaFechaTurnos.length} values.`)
  res.status(200).json(AsistenciaFechaTurnos)
}

async function getAsistenciaFechaTurnos (req, res) {
  const [err, AsistenciaFechaTurnos] = await get(models.sequelize.query(
    getQuery(req.query.idusuario)))
  if (err) {
    logger.error(`500 GET getAsistenciaFechaTurnos, ${err}.`)
    return res.status(500).json({ message: `${err}` })
  }
  if (AsistenciaFechaTurnos == null) {
    logger.error('404 GET getAsistenciaFechaTurnos, AsistenciaFechaTurnos nulos.')
    return res.status(404).json({ message: 'AsistenciaFechaTurnos nulos' })
  }
  logger.info(`200 GET getAsistenciaFechaTurnos, ${AsistenciaFechaTurnos.length} values.`)
  console.log('resultado')
  res.status(200).json(transform(AsistenciaFechaTurnos[0]))
}

async function getAsistenciaFechaTurno (req, res) {
  const [err, AsistenciaFechaTurno] = await get(models.AsistenciaFechaTurno.findOne({
    where: { id: req.params.id, estado: 'A' },
    include: [{ all: true }]
  }))
  if (err) {
    logger.error(`500 GET getAsistenciaFechaTurno, ${err}.`)
    return res.status(500).json({ message: `${err}` })
  }
  if (AsistenciaFechaTurno == null) {
    logger.error('400 GET getAsistenciaFechaTurno, AsistenciaFechaTurno nulos.')
    return res.status(404).json({ message: 'AsistenciaFechaTurno nulos' })
  }
  logger.info(`200 GET getAsistenciaFechaTurno, ${AsistenciaFechaTurno.length} values.`)
  res.status(200).json(AsistenciaFechaTurno)
}

async function createAsistenciaFechaTurno (req, res) {
  const [err, asistenciaFechaTurno] = await get(models.AsistenciaFechaTurno.create({
    idasistenciaturno: req.body.idasistenciaturno,
    fecha: req.body.fecha,
    idubicacion: req.body.idubicacion,
    idturno: req.body.idturno,
    idestado: req.body.idestado,
    ipmovil: req.ip,
    fechamod: req.body.fechamod,
    idusuario: req.body.idusuario,
    estado: req.body.estado,

    accion: 'I',
    accion_usuario: 'Creo un nuevo AsistenciaFechaTurno.',
    ip: req.ip,
    usuario: 0
  }))
  if (err) {
    logger.error(`500 POST createAsistenciaFechaTurno, ${err}.`)
    return res.status(500).json({ message: `${err}` })
  }
  if (asistenciaFechaTurno == null) {
    logger.error('400 POST createAsistenciaFechaTurno, asistenciaFechaTurno nulos.')
    return res.status(404).json({ message: 'asistenciaFechaTurno nulos' })
  }
  logger.info(`200 POST createAsistenciaFechaTurno, new id: ${asistenciaFechaTurno.idasistenciaturno}.`)
  res.status(200).json(asistenciaFechaTurno)
}

// Cannot insert explicit value for identity column in table 'Asistencia_FechaxTurno' when IDENTITY_INSERT is set to OFF

async function createAllAsistenciaFechaTurno (req, res) {
  try {
    const t = await models.sequelize.transaction(async (t) => {
      const asistencia = await models.AsistenciaFechaTurno.create({

        fecha: req.body.fecha,
        idubicacion: req.body.idubicacion,
        idturno: req.body.idturno,
        idestado: req.body.idestado,
        ipmovil: req.body.idturno,
        fechamod: req.body.fechamod,
        idusuario: req.body.idusuario
      }, { transaction: t })

      const detalles = []
      for (const d of req.body.detalles) {
        console.log(d)
        detalles.push(
          {
            idasistenciaturno: asistencia.idasistenciaturno,
            codigoempresa: d.codigoempresa,
            tipomovimiento: '',
            fechaentrada: d.fechaentrada,
            horaentrada: d.horaentrada,
            idubicacionentrada: req.body.idubicacion,
            fechasalida: d.fechasalida,
            horasalida: d.horasalida,
            idubicacionsalida: req.body.idubicacion,
            idturno: req.body.idturno,
            fechaturno: req.body.fecha,
            idusuario: d.idusuario,
            fechamod: req.body.fechamod
          }
        )
      }
      const [err, asistenciaRegistroPersonal] = await get(models.AsistenciaRegistroPersonal.bulkCreate(detalles, { transaction: t }))
      if (err) {
        logger.error(`Error: POST createAllAsistenciaFechaTurno, ${err}`)
        return res.status(500).json({ message: `${err}` })
      }
      logger.info(`200 POST createAllAsistenciaFechaTurno, new id: ${asistencia.idasistenciaturno}.`)
      return res.status(200).json(asistencia)
    })
  } catch (error) {
    logger.error(`Error: POST createAllAsistenciaFechaTurno, ${error}`)
    return res.status(500).json({ message: `${error}` })
  }
}

async function updateAsistenciaFechaTurno (req, res) {
  const [err, asistenciaFechaTurno] = await get(models.AsistenciaFechaTurno.update({
    estado: req.body.estado,

    accion: 'U',
    accion_usuario: 'Edito un asistenciaFechaTurno.',
    ip: req.ip,
    usuario: 0
  }, {
    where: {
      idasistenciaturno: req.body.idasistenciaturno // estado: 'A'
    },
    individualHooks: true,
    validate: false
  }))
  if (err) {
    logger.error(`500 PUT updateAsistenciaFechaTurno, ${err}.`)
    return res.status(500).json({ message: `${err}` })
  }
  if (asistenciaFechaTurno == null) {
    logger.error('404 PUT updateAsistenciaFechaTurno, asistenciaFechaTurno nulos.')
    return res.status(404).json({ message: 'asistenciaFechaTurno nulos' })
  }
  logger.info(`200 PUT updateAsistenciaFechaTurno, ${asistenciaFechaTurno[1][0].dataValues.length} values.`)
  res.status(200).json(asistenciaFechaTurno[1][0].dataValues)
}

async function deleteAsistenciaFechaTurno (req, res) {
  const [err, AsistenciaFechaTurno] = await get(models.AsistenciaFechaTurno.update({
    estado: 'I',

    accion_usuario: 'Elimino un AsistenciaFechaTurno.',
    accion: 'D',
    ip: req.ip,
    usuario: 0
  }, {
    where: {
      idasistenciaturno: req.params.id
    },
    individualHooks: true
  }))
  if (err) {
    logger.error(`500 DELETE deleteAsistenciaFechaTurno, ${err}.`)
    return res.status(500).json({ message: `${err}` })
  }
  if (AsistenciaFechaTurno == null) {
    logger.error('404 DELETE deleteAsistenciaFechaTurno, AsistenciaFechaTurno nulos.')
    return res.status(404).json({ message: 'AsistenciaFechaTurno nulos' })
  }
  logger.info(`200 DELETE deleteAsistenciaFechaTurno, ${AsistenciaFechaTurno[1][0].dataValues} values.`)
  res.status(200).json(AsistenciaFechaTurno[1][0].dataValues)
}

async function uploadFileAsistenciaFechaTurno (req, res) {
  const [err, asistenciaFechaTurno] = await get(models.AsistenciaFechaTurno.update({
    firmasupervisor: req.file.filename,

    accion: 'U',
    accion_usuario: 'Subio un archivo a la bd.',
    ip: req.ip,
    usuario: 0
  }, {
    where: {
      idasistenciaturno: req.body.idasistenciaturno
    },
    individualHooks: true,
    validate: false
  }))
  if (err) {
    logger.error(`500 PUT uploadFileAsistenciaFechaTurno, ${err}.`)
    return res.status(500).json({ message: `${err}` })
  }
  if (asistenciaFechaTurno == null) {
    logger.error('404 PUT uploadFileAsistenciaFechaTurno, AsistenciaFechaTurno nulos.')
    return res.status(404).json({ message: 'AsistenciaFechaTurno nulos' })
  }
  logger.info(`200 PUT uploadFileAsistenciaFechaTurno, ${asistenciaFechaTurno[1][0].dataValues} values.`)
  res.status(200).json(asistenciaFechaTurno[1][0].dataValues)
}

function get (promise) {
  return promise.then(data => {
    return [null, data]
  })
    .catch(err => [err])
}

module.exports = {
  getAsistenciaFechaTurnosCount,
  updateAsistenciaFechaTurno,
  getAsistenciaFechaTurnosByLimitAndOffset,
  createAllAsistenciaFechaTurno,
  getAsistenciaFechaTurnos,
  getAsistenciaFechaTurno,
  createAsistenciaFechaTurno,
  deleteAsistenciaFechaTurno,
  uploadFileAsistenciaFechaTurno
}

const getQuery = (idusuario) => `
SELECT AF.idasistenciaturno as "idasistenciaturno", 
AF.fecha as "fecha",
  AF.fechamod as "fechamod",
  AF.idTurno as "idturno",
T.idturno  as "Turno.idturno",
T.turno as "Turno.turno",
U.ubicacion  as "Ubicacion.ubicacion",
  U.idubicacion  as "Ubicacion.idubicacion",
  AF.idubicacion  as "idubicacion",
AF.estado as "estado",
(SELECT COUNT(*) FROM Asistencia_RegistrosPersonal 
where Asistencia_RegistrosPersonal.idasistenciaturno = AF.idasistenciaturno 
AND estado = 'A'
AND Asistencia_RegistrosPersonal.tipomovimiento= 'S') as sizeSalidas,
(SELECT COUNT(*) FROM Asistencia_RegistrosPersonal 
where Asistencia_RegistrosPersonal.idasistenciaturno = AF.idasistenciaturno
AND estado = 'A'
AND Asistencia_RegistrosPersonal.tipomovimiento= 'I') as sizeEntradas
FROM Asistencia_FechaxTurno as AF INNER JOIN asistencia_turno as T
ON AF.idturno  = T.idturno  
INNER JOIN Asistencia_Ubicacion as U ON AF.idubicacion = U.idubicacion 
WHERE idusuario = ${idusuario} AND estado != 'I'
ORDER BY idasistenciaturno DESC;
`
