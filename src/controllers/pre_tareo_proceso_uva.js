'use strict'
const models = require('../models')

async function getPre_Tareo_Proceso_Uvas (req, res) {
  const [err, preTareoProcesoUvas] = await get(models.Pre_Tareo_Proceso_Uva.findAll({
    /* where:{estado: 'A'}, */
    /* order: [['fechamod','DESC']], */
    include: [
      { model: models.Centro_Costo },
      { model: models.Labores_Cultivo_Packing, include: [{ all: true }] }
    ]
  }))
  if (err) return res.status(500).json({ message: `${err}` })
  if (preTareoProcesoUvas == null) return res.status(404).json({ message: 'Pre_Tareo_Proceso_Uvas nulos' })
  res.status(200).json(preTareoProcesoUvas)
}

async function getPre_Tareo_Proceso_Uva (req, res) {
  const [err, pre_tareo_proceso_uva] = await get(models.Pre_Tareo_Proceso_Uva.findOne({
    where: { itempretareaprocesouva: req.params.id/*  estado: 'A'  */ },
    include: [{ all: true }]
  }))
  console.log(pre_tareo_proceso_uva.Pre_Tareo_Proceso_Uva_Detalles.length)
  if (err) return res.status(500).json({ message: `${err}` })
  if (pre_tareo_proceso_uva == null) return res.status(404).json({ message: 'Pre_Tareo_Proceso_Uvas nulos' })
  res.status(200).json(pre_tareo_proceso_uva)
}

async function preTareaProcesoUvaByRango (req, res) {
  console.log(req.body)
  let where
  if (req.body.idcultivo == '-1') {
    where = {
      fecha: {
        [models.Sequelize.Op.between]: [new Date(req.body.inicio).setHours(0, 0, 0), new Date(req.body.fin).setHours(23, 59, 59)]
      }
    }
  } else {
    where = {
      fecha: {
        [models.Sequelize.Op.between]: [new Date(req.body.inicio).setHours(0, 0, 0), new Date(req.body.fin).setHours(23, 59, 59)]
      },
      idcultivo: req.body.idcultivo
    }
  }

  const [err, pretareoProcesoUva] = await get(models.Pre_Tareo_Proceso_Uva.findAll({
    where,
    raw: true,
    attributes: [
      'itempretareaprocesouva',
      'turnotareo',
      'fecha',
      [models.sequelize.col('Centro_Costo.detallecentrocosto'), 'centroCosto'],
      [models.sequelize.col('Cultivo.detallecultivo'), 'cultivo'],
      [models.sequelize.fn('count', models.sequelize.col('Pre_Tareo_Proceso_Uva.itempretareaprocesouva')), 'detalles']
    ],
    group: [
      'Pre_Tareo_Proceso_Uva.itempretareaprocesouva',
      'Pre_Tareo_Proceso_Uva.turnotareo',
      'Pre_Tareo_Proceso_Uva.fecha',
      'Centro_Costo.detallecentrocosto',
      'Cultivo.detallecultivo'
    ],
    include: [
      { model: models.Centro_Costo, attributes: [] },
      { model: models.Cultivo, attributes: [] },
      { model: models.Pre_Tareo_Proceso_Uva_Detalle, attributes: [] }
    ]
  }))
  console.log(err)
  if (err) return res.status(500).json({ message: `${err}` })
  if (pretareoProcesoUva == null) return res.status(404).json({ message: 'Packing nulos' })
  res.status(200).json(pretareoProcesoUva)
}

async function createPre_Tareo_Proceso_Uva (req, res) {
  const [err, pre_tareo_proceso_uva] = await get(models.Pre_Tareo_Proceso_Uva.create({
    // all fields to insert

    accion: 'I',
    accion_usuario: 'Creo un nuevo pre_tareo_proceso_uva.',
    ip: req.ip,
    usuario: 0
  }))
  if (err) return res.status(500).json({ message: 'err' })
  if (pre_tareo_proceso_uva == null) return res.status(404).json({ message: 'Pre_Tareo_Proceso_Uvas nulos' })
  res.status(200).json(pre_tareo_proceso_uva)
}

async function createAllPreTareoProcesoUva (req, res) {
  try {
    const result = await models.sequelize.transaction(async (t) => {
      const tarea = await models.Pre_Tareo_Proceso_Uva.create({
        fecha: req.body.fecha,
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
        accion_usuario: 'Creo un nuevo pre tareo completo.'
      }, { transaction: t })

      if (req.body.Pre_Tareo_Proceso_Uva_Detalles) {
        for (let i = 0; i < req.body.Pre_Tareo_Proceso_Uva_Detalles.length; i++) {
          req.body.Pre_Tareo_Proceso_Uva_Detalles[i].itempretareaprocesouva = tarea.itempretareaprocesouva
          req.body.Pre_Tareo_Proceso_Uva_Detalles[i].fechamod = Date.now()
          req.body.Pre_Tareo_Proceso_Uva_Detalles[i].idestado = 1
        }
        await models.Pre_Tareo_Proceso_Uva_Detalle.bulkCreate(req.body.Pre_Tareo_Proceso_Uva_Detalles, { transaction: t })
      }
      return tarea
    })
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: `Error en el servidor ${error}` })
  }
}

async function updatePre_Tareo_Proceso_Uva (req, res) {
  const [err, pre_tareo_proceso_uva] = await get(models.Pre_Tareo_Proceso_Uva.update({
    // all fields to update

    accion: 'U',
    accion_usuario: 'Edito un pre_tareo_proceso_uva.',
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
  if (pre_tareo_proceso_uva == null) return res.status(404).json({ message: 'Pre_Tareo_Proceso_Uvas nulos' })
  res.status(200).json(pre_tareo_proceso_uva[1][0].dataValues)
}

async function deletePre_Tareo_Proceso_Uva (req, res) {
  const [err, pre_tareo_proceso_uva] = await get(models.Pre_Tareo_Proceso_Uva.update({
    estado: 'I',

    accion_usuario: 'Elimino un pre_tareo_proceso_uva.',
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
  if (pre_tareo_proceso_uva == null) return res.status(404).json({ message: 'Pre_Tareo_Proceso_Uvas nulos' })
  res.status(200).json(pre_tareo_proceso_uva[1][0].dataValues)
}

async function uploadFilePreTareoProcesoUva (req, res) {
  /* console.log(req.body); */

  const [err, pretareoProcesoUva] = await get(models.Pre_Tareo_Proceso_Uva.update({
    firmasupervisor: req.file.filename,

    accion: 'U',
    accion_usuario: 'Edito un preTareoProceso.',
    ip: req.ip,
    usuario: 0
  }, {
    where: {
      itempretareaprocesouva: req.body.itempretareaprocesouva
    },
    individualHooks: true,
    validate: false
  }))
  /* console.log(err); */
  if (err) return res.status(500).json({ message: `${err}` })
  if (pretareoProcesoUva == null) return res.status(404).json({ message: 'Pretareos nulos' })
  res.status(200).json(pretareoProcesoUva[1][0].dataValues)
}

function get (promise) {
  return promise.then(data => {
    return [null, data]
  })
    .catch(err => [err])
}

module.exports = {
  getPre_Tareo_Proceso_Uvas,
  getPre_Tareo_Proceso_Uva,
  createPre_Tareo_Proceso_Uva,
  createAllPreTareoProcesoUva,
  updatePre_Tareo_Proceso_Uva,
  deletePre_Tareo_Proceso_Uva,
  uploadFilePreTareoProcesoUva,
  preTareaProcesoUvaByRango
}
