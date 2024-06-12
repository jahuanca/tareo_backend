'use strict'
const models = require('../models')

async function getPre_Tareo_Proceso_Uva_Detalles (req, res) {
  const [err, name_mins] = await get(models.Pre_Tareo_Proceso_Uva_Detalle.findAll({
    where: { estado: 'A' },
    include: [{ all: true }]
  }))
  if (err) return res.status(500).json({ message: 'err' })
  if (name_mins == null) return res.status(404).json({ message: 'Pre_Tareo_Proceso_Uva_Detalles nulos' })
  res.status(200).json(name_mins)
}

async function preTareaProcesoUvaDetalleByRango (req, res) {
  console.log(req.body)
  const where = {
    fecha: {
      [models.Sequelize.Op.between]: [new Date(req.body.inicio).setUTCHours(0, 0, 0), new Date(req.body.fin).setUTCHours(23, 59, 59)]
    }
  }
  let wIn
  if (req.body.idcultivo == '-1') {
    wIn = { model: models.Pre_Tareo_Proceso_Uva, include: [{ model: models.Cultivo }] }
  } else {
    wIn = { model: models.Pre_Tareo_Proceso_Uva, where: { idcultivo: req.body.idcultivo }, required: true, include: [{ model: models.Cultivo }] }
  }

  const [err, pretareoProcesoUva] = await get(models.Pre_Tareo_Proceso_Uva_Detalle.findAll({
    where,
    include: [wIn, { model: models.Labor }, {
      model: models.Actividad
    }]
  }))
  if (err) return res.status(500).json({ message: `${err}` })
  if (pretareoProcesoUva == null) return res.status(404).json({ message: 'Packing nulos' })
  res.status(200).json(pretareoProcesoUva)
}

async function getPre_Tareo_Proceso_Uva_Detalle (req, res) {
  const [err, nameMin] = await get(models.Pre_Tareo_Proceso_Uva_Detalle.findOne({
    where: { id: req.params.id, estado: 'A' },
    include: [{ all: true }]
  }))
  console.log(err)
  if (err) return res.status(500).json({ message: 'err' })
  if (nameMin == null) return res.status(404).json({ message: 'Pre_Tareo_Proceso_Uva_Detalles nulos' })
  res.status(200).json(nameMin)
}

async function getPre_Tareo_Proceso_Uva_DetalleByMaster (req, res) {
  const [err, nameMin] = await get(models.Pre_Tareo_Proceso_Uva_Detalle.findAll({
    where: { itempretareaprocesouva: req.params.id },
    include: [{ all: true }]
  }))
  console.log(err)
  if (err) return res.status(500).json({ message: 'err' })
  if (nameMin == null) return res.status(404).json({ message: 'Pre_Tareo_Proceso_Uva_Detalles nulos' })
  res.status(200).json(nameMin)
}

async function createPre_Tareo_Proceso_Uva_Detalle (req, res) {
  const [err, nameMin] = await get(models.Pre_Tareo_Proceso_Uva_Detalle.create({
    // all fields to insert

    accion: 'I',
    accion_usuario: 'Creo un nuevo nameMin.',
    ip: req.ip,
    usuario: 0
  }))
  if (err) return res.status(500).json({ message: 'err' })
  if (nameMin == null) return res.status(404).json({ message: 'Pre_Tareo_Proceso_Uva_Detalles nulos' })
  res.status(200).json(nameMin)
}

async function updatePre_Tareo_Proceso_Uva_Detalle (req, res) {
  const [err, nameMin] = await get(models.Pre_Tareo_Proceso_Uva_Detalle.update({
    // all fields to update

    accion: 'U',
    accion_usuario: 'Edito un nameMin.',
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
  if (nameMin == null) return res.status(404).json({ message: 'Pre_Tareo_Proceso_Uva_Detalles nulos' })
  res.status(200).json(nameMin[1][0].dataValues)
}

async function deletePre_Tareo_Proceso_Uva_Detalle (req, res) {
  const [err, nameMin] = await get(models.Pre_Tareo_Proceso_Uva_Detalle.update({
    estado: 'I',

    accion_usuario: 'Elimino un nameMin.',
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
  if (nameMin == null) return res.status(404).json({ message: 'Pre_Tareo_Proceso_Uva_Detalles nulos' })
  res.status(200).json(nameMin[1][0].dataValues)
}

function get (promise) {
  return promise.then(data => {
    return [null, data]
  })
    .catch(err => [err])
}

module.exports = {
  getPre_Tareo_Proceso_Uva_Detalles,
  getPre_Tareo_Proceso_Uva_Detalle,
  getPre_Tareo_Proceso_Uva_DetalleByMaster,
  createPre_Tareo_Proceso_Uva_Detalle,
  updatePre_Tareo_Proceso_Uva_Detalle,
  deletePre_Tareo_Proceso_Uva_Detalle,
  preTareaProcesoUvaDetalleByRango
}
