const logger = require('../config/logger')
const models = require('../models')
const { getError, getNowTime } = require('../services/utils')

const getPackings = async (req, res) => {
  const query = { estado: { [models.Sequelize.Op.not]: 'I' } }
  const { idusuario = null } = req.query
  if (idusuario) query.idusuario = idusuario
  const [err, packings] = await getError(models.Pre_Tareo_Proceso_Uva.findAll({
    where: query,
    include: [{ all: true }],
    attributes: {
      include: [
        [
          models.sequelize.literal(`(
                  SELECT COUNT(*)
                  FROM PreTareaProcesoUvaDetalle AS personal
                  WHERE
                      personal.itempretareaprocesouva = Pre_Tareo_Proceso_Uva.itempretareaprocesouva
                  AND Pre_Tareo_Proceso_Uva.idusuario= ${query.idusuario}
                  AND personal.estado != 'I'
              )`),
          'sizeDetails'
        ]
      ]
    }
  }))
  if (err) {
    err.message = `GET getPackings, ${err.message}.`
    throw err
  }
  logger.info(`200 GET getPackings, size: ${packings.length}.`)
  res.status(200).json(packings)
}

const getPersonalPacking = async (req, res) => {
  const { id } = req.params
  const [err, packings] = await getError(models.Pre_Tareo_Proceso_Uva_Detalle.findAll({
    where: {
      itempretareaprocesouva: id,
      estado: 'A'
    },
    include: [
      {
        model: models.Labor
      },
      {
        model: models.Personal_Empresa
      },
      {
        model: models.Actividad
      }
    ]
  }))
  if (err) {
    err.message = `GET getPersonalPacking, ${err.message}.`
    throw err
  }
  logger.info(`200 GET getPersonalPacking, size: ${packings.length}.`)
  res.status(200).json(packings)
}

const createPacking = async (req, res) => {
  const [err, packing] = await getError(models.Pre_Tareo_Proceso_Uva.create({
    fecha: getNowTime(new Date()),
    horainicio: getNowTime(req.body.horainicio),
    horafin: getNowTime(req.body.horafin),
    pausainicio: getNowTime(req.body.pausainicio),
    pausafin: getNowTime(req.body.pausafin),
    linea: 1,
    idcentrocosto: req.body.idcentrocosto,
    idcultivo: req.body.idcultivo,
    codigoempresasupervisor: req.body.codigoempresasupervisor,
    codigoempresadigitador: req.body.codigoempresadigitador,
    /* fechamod: new Date(req.body.fechamod), */
    /* activo: true, */
    idusuario: req.body.idusuario,
    idestado: 1,
    turnotareo: req.body.turnotareo,
    diasiguiente: req.body.diasiguiente,
    estado: 'P',

    accion: 'I',
    usuario: 0,
    ip: req.ip,
    accion_usuario: 'Creo un nuevo pre tareo completo.'
  }))
  if (err) {
    err.message = `POST createPacking, ${err.message}.`
    throw err
  }
  logger.info(`200 POST createPacking, new id: ${packing.itempretareaprocesouva}.`)
  res.status(200).json(packing)
}

const createPersonalPacking = async (req, res) => {
  const [err, packing] = await getError(models.Pre_Tareo_Proceso_Uva_Detalle.create({
    itempretareoprocesouvadetalle: req.body.itempretareoprocesouvadetalle,
    codigoempresa: req.body.codigoempresa,
    itempretareaprocesouva: req.body.itempretareaprocesouva,
    numcaja: req.body.numcaja,
    fecha: getNowTime(new Date()),
    hora: getNowTime(new Date()),
    imei: req.body.imei,
    idusuario: req.body.idusuario,
    idlabor: req.body.idlabor,
    idactividad: req.body.idactividad,
    idpresentacion: req.body.idpresentacion,
    idestado: req.body.idestado,
    codigotk: req.body.codigotk
  }))
  if (err) {
    err.message = `POST createPersonalPacking, ${err.message}.`
    throw err
  }
  logger.info(`200 POST createPersonalPacking, new id: ${packing.itempretareaprocesouva}.`)
  res.status(200).json(packing)
}

const updatePacking = async (req, res) => {
  console.log(req.body)
  const [err, packing] = await getError(models.Pre_Tareo_Proceso_Uva.update({
    horainicio: req.body.horainicio,
    horafin: req.body.horafin,
    pausainicio: req.body.pausainicio,
    pausafin: req.body.pausafin,
    linea: 1,
    idcentrocosto: req.body.idcentrocosto,
    idcultivo: req.body.idcultivo,
    codigoempresasupervisor: req.body.codigoempresasupervisor,
    codigoempresadigitador: req.body.codigoempresadigitador,
    /* fechamod: new Date(req.body.fechamod), */
    /* activo: true, */
    idusuario: req.body.idusuario,
    idestado: 1,
    turnotareo: req.body.turnotareo,
    diasiguiente: req.body.diasiguiente,

    accion: 'I',
    usuario: 0,
    ip: req.ip,
    accion_usuario: 'Edito un packing.'
  }, {
    where: {
      itempretareaprocesouva: req.body.itempretareaprocesouva
    },
    individualHooks: true
  }
  ))
  if (err) {
    err.message = `PUT updatePacking, ${err.message}.`
    throw err
  }
  logger.info(`200 PUT updatePacking, id: ${packing[1][0].dataValues.itempretareaprocesouva} `)
  res.status(200).json(packing[1][0].dataValues)
}

const deletePersonalPacking = async (req, res) => {
  const { id } = req.params
  const [err, personal] = await getError(models.Pre_Tareo_Proceso_Uva_Detalle.destroy({
    where: {
      itempretareoprocesouvadetalle: id
    },
    individualHooks: true,
    force: true
  }))

  if (err) {
    err.message = `DELETE deletePersonalPacking, ${err.message}.`
    throw err
  }
  logger.info(`200 DELETE deletePersonalPacking, se elimino el itempretareoprocesouvadetalle: ${id}`)
  res.status(200).json(personal)
}

const deletePacking = async (req, res) => {
  const { id } = req.params
  const [err, packing] = await getError(models.Pre_Tareo_Proceso_Uva.findOne({
    where: {
      itempretareaprocesouva: id
    }
  }))
  if (err) {
    err.message = `DELETE deletePacking, ${err.message}.`
    throw err
  }
  if (packing.estado === 'A') {
    await cleanPacking(req, res)
  } else {
    await removePacking(req, res)
  }
}

const cleanPacking = async (req, res) => {
  const { id } = req.params
  const [err, packing] = await getError(models.Pre_Tareo_Proceso_Uva.update({
    estado: 'I',
    accion: 'U',
    accion_usuario: 'Limpio un packing.',
    ip: req.ip,
    usuario: 0
  }, {
    where: {
      itempretareaprocesouva: id
    },
    individualHooks: true,
    validate: false
  }))
  if (err) {
    err.message = `DELETE cleanPacking, ${err.message}.`
    throw err
  }
  logger.info(`200 DELETE cleanPacking, se limpio el packing: ${packing[1][0].dataValues.itempretareaprocesouva}`)
  res.status(200).json(packing[1][0].dataValues)
}

const removePacking = async (req, res) => {
  const { id } = req.params
  const [err, personal] = await getError(models.Pre_Tareo_Proceso_Uva_Detalle.destroy({
    where: {
      itempretareaprocesouva: id
    },
    individualHooks: true,
    force: true
  }))

  if (err) {
    err.message = `DELETE deletePacking, ${err.message}.`
    throw err
  }
  logger.info(`200 DELETE deletePacking, se elimino: ${personal} detalles`)

  const [err2, packing] = await getError(models.Pre_Tareo_Proceso_Uva.destroy({
    where: {
      itempretareaprocesouva: id
    },
    individualHooks: true,
    force: true
  }))

  if (err2) {
    err2.message = `DELETE deletePacking, ${err2.message}.`
    throw err2
  }
  logger.info(`200 DELETE deletePacking, se elimino el packing: ${id}`)
  res.status(200).json(packing)
}

const getReportPacking = async (req, res) => {
  const { codigoempresa, itempretareaprocesouva } = req.query
  const [err, report] = await getError(models.Pre_Tareo_Proceso_Uva_Detalle.findAll({
    raw: true,
    attributes: ['Pre_Tareo_Proceso_Uva_Detalle.idlabor', 'Labor.descripcion', [models.sequelize.fn('COUNT', 'Pre_Tareo_Proceso_Uva_Detalle.idlabor'), 'size']],
    where: {
      itempretareaprocesouva,
      codigoempresa
    },
    include: [{ model: models.Labor, attributes: [] }],
    group: ['Pre_Tareo_Proceso_Uva_Detalle.idlabor', 'Labor.descripcion']
  }))
  if (err) {
    err.message = `GET getReportPacking, ${err.message}.`
    throw err
  }
  /* const result = report.reduce(function (map, obj) {
    map[obj.idlabor] = obj
    return map
  }, {}) */
  logger.info(`200 GET getReportPacking, reporte del packing: ${itempretareaprocesouva}`)
  res.status(200).json(report)
}

module.exports = {
  getPackings,
  getPersonalPacking,
  createPacking,
  updatePacking,
  createPersonalPacking,
  deletePersonalPacking,
  deletePacking,
  getReportPacking
}
