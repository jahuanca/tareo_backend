const { asyncCatch, getError } = require('../services/utils')
const logger = require('../config/logger')
const models = require('../models')

const getPesados = asyncCatch(async (req, res) => {
  const query = req.query
  query.estado = 'A'
  console.log(query)
  const [err, pesados] = await getError(models.Pre_Tarea_Esparrago_Varios.findAll({
    where: {
      idusuario: query.idusuario,
      estado: { [models.Sequelize.Op.in]: ['A', 'M'] }
    },
    // where: query,
    include: [{ all: true }],
    attributes: {
      include: [
        [
          models.sequelize.literal(`(
                  SELECT COUNT(*)
                  FROM PersonalPreTareaEsparrago AS personal
                  WHERE
                      personal.itempretareaesparragovarios = Pre_Tarea_Esparrago_Varios.itempretareaesparragovarios
                  AND personal.idestado = 1
                  AND Pre_Tarea_Esparrago_Varios.idusuario= ${query.idusuario}
                  AND (
                    Pre_Tarea_Esparrago_Varios.estado= 'A' 
                    OR Pre_Tarea_Esparrago_Varios.estado = 'M' )
                  
              )`),
          'sizeDetails'
        ]
      ]
    }
  }))
  if (err) {
    err.message = `500 GET getPesados, ${err.message}.`
    throw err
  }
  logger.info(`200 GET getPesados, ${pesados.length} items.`)
  res.status(200).json(pesados)
})

const getPesadoPersonal = asyncCatch(async (req, res) => {
  const query = req.query
  query.idestado = 1
  console.log(query)
  const [err, pesados] = await getError(models.Personal_Pre_Tarea_Esparrago.findAll({
    where: query,
    include: [{ all: true }]
  }))
  if (err) {
    err.message = `500 GET getPesadoPersonal, ${err.message}.`
    throw err
  }
  logger.info(`200 GET getPesadoPersonal, ${pesados.length} items.`)
  res.status(200).json(pesados)
})

const createPesado = asyncCatch(async (req, res) => {
  console.log(req.body)
  const [err, pesado] = await getError(models.Pre_Tarea_Esparrago_Varios.create({
    fecha: req.body.fecha,
    hora: new Date(),
    horainicio: req.body.horainicio,
    horafin: req.body.horafin,
    pausainicio: req.body.pausainicio,
    pausafin: req.body.pausafin,
    linea: 1,
    idcentrocosto: req.body.idcentrocosto,
    idlabor: req.body.idlabor,
    idtipotarea: req.body.idtipotarea,
    codigosupervisor: req.body.codigosupervisor,
    codigodigitador: req.body.codigodigitador,
    fechamod: new Date(),
    /* activo: true, */
    idusuario: req.body.idusuario,
    idestado: 1,
    estado: 'A',
    turnotareo: req.body.turnotareo,
    diasiguiente: req.body.diasiguiente,

    accion: 'I',
    usuario: 0,
    ip: req.ip,
    accion_usuario: 'Creo un nuevo pesado.'
  }
  ))
  if (err) {
    err.message = `POST createPesado, ${err.message}.`
    throw err
  }
  logger.info(`200 POST createPesado, new key: ${pesado.itempretareaesparragovarios}.`)
  res.status(200).json(pesado)
})

const updatePesado = asyncCatch(async (req, res) => {
  const [err, pesado] = await getError(models.Pre_Tarea_Esparrago_Varios.findOne({
    where: {
      itempretareaesparragovarios: req.body.itempretareaesparragovarios
    }
  }))
  if (err) {
    err.message = `500 PUT updatePesado, ${err.message}.`
    throw err
  }
  if (pesado != null) {
    pesado.fecha = new Date(req.body.fecha)
    pesado.horainicio = req.body.horainicio
    pesado.horafin = req.body.horafin
    pesado.pausainicio = req.body.pausainicio
    pesado.pausafin = req.body.pausafin
    pesado.idestado = req.body.idestado
    pesado.idusuario = req.body.idusuario
    pesado.idcentrocosto = req.body.idcentrocosto
    pesado.idtipotarea = req.body.idtipotarea
    pesado.diasiguiente = req.body.diasiguiente
    pesado.codigosupervisor = req.body.codigosupervisor
    pesado.codigodigitador = req.body.codigodigitador
    pesado.turnotareo = req.body.turnotareo
    pesado.linea = req.body.linea
    pesado.estado = req.body.estado
    pesado.save()
    logger.info(`200 PUT updatePesado, ${req.body.itempretareaesparragovarios} itempretareaesparragovarios.`)
    res.status(200).json(pesado)
  }
})

const createPersonalPesado = asyncCatch(async (req, res) => {
  const [err, pesado] = await getError(models.Personal_Pre_Tarea_Esparrago.create({
    itempretareaesparragovarios: req.body.itempretareaesparragovarios,
    idcliente: req.body.idcliente,
    idlabor: req.body.idlabor,
    idvia: req.body.idvia,
    viaEnvio: req.body.viaEnvio,
    correlativocaja: req.body.correlativocaja,
    codigotkcaja: req.body.codigotkcaja,
    idcalibre: req.body.idcalibre,
    codigotkmesa: req.body.codigotkmesa,
    mesa: req.body.mesa,
    linea: req.body.linea,
    correlativomesa: req.body.correlativomesa,
    fechamod: new Date(),
    idusuario: req.body.idusuario,
    fecha: req.body.fecha,
    hora: new Date(),

    idestado: 1,
    estado: 'A',

    accion: 'I',
    usuario: 0,
    ip: req.ip,
    accion_usuario: 'Creo un personal detalle.'
  }
  ))
  if (err) {
    err.message = `POST createPersonalPesado, ${err.message}.`
    throw err
  }
  logger.info(`200 POST createPersonalPesado, new key: ${pesado.itempretareaesparragovarios}.`)
  res.status(200).json(pesado)
})

const deletePesado = asyncCatch(async (req, res) => {
  const [err, pesado] = await getError(models.Pre_Tarea_Esparrago_Varios.update({
    estado: 'I',
    accion: 'D',
    usuario: 0,
    ip: req.ip,
    accion_usuario: 'Elimino un pesado.'
  }, {
    where: {
      itempretareaesparragovarios: req.params.id
    },
    individualHooks: true,
    validate: false
  }))
  if (err) {
    err.message = `500 DELETE deletePesado, ${err.message}.`
    throw err
  }
  logger.info(`200 DELETE deletePesado, ${req.params.id} id.`)
  console.log(pesado[0])
  console.log(pesado[0][1])
  res.status(200).json(pesado[1][0].dataValues)
})

const deletePersonalPesado = asyncCatch(async (req, res) => {
  const [err, pesado] = await getError(models.Personal_Pre_Tarea_Esparrago.update({
    idestado: 0,
    accion: 'D',
    usuario: 0,
    ip: req.ip,
    accion_usuario: 'Elimino un personal-pesado.'
  }, {
    where: {
      itempersonalpretareaesparrago: req.params.id
    },
    individualHooks: true,
    validate: false
  }))
  if (err) {
    err.message = `500 DELETE deletePersonalPesado, ${err.message}.`
    throw err
  }
  logger.info(`200 DELETE deletePersonalPesado, ${req.params.id} id.`)
  res.status(200).json(pesado[1][0].dataValues)
})

const createDetallePesado = asyncCatch(async (req, res) => {
  const [err, pesado] = await getError(models.Personal_Pre_Tarea_Esparrago.create({
    fecha: req.body.fecha,
    hora: new Date(),
    horainicio: req.body.horainicio,
    horafin: req.body.horafin,
    pausainicio: req.body.pausainicio,
    pausafin: req.body.pausafin,
    linea: req.body.linea,
    idcentrocosto: req.body.idcentrocosto,
    idlabor: req.body.idlabor,
    idtipotarea: req.body.idtipotarea,
    codigosupervisor: req.body.codigosupervisor,
    codigodigitador: req.body.codigodigitador,
    fechamod: new Date(),
    /* activo: true, */
    idusuario: req.body.idusuario,
    idestado: 1,
    estado: 'A',
    turnotareo: req.body.turnotareo,
    diasiguiente: req.body.diasiguiente,

    accion: 'I',
    usuario: 0,
    ip: req.ip,
    accion_usuario: 'Creo un nuevo pesado.'
  }
  ))
  if (err) {
    err.message = `POST createPesado, ${err.message}.`
    throw err
  }
  logger.info(`200 POST createPesado, new key: ${pesado.itempretareaesparragovarios}.`)
  res.status(200).json(pesado)
})

module.exports = {
  getPesados,
  getPesadoPersonal,
  createPesado,
  createPersonalPesado,
  deletePesado,
  createDetallePesado,
  deletePersonalPesado,
  updatePesado
}
