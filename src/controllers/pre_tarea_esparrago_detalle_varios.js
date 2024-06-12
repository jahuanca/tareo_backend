'use strict'
const models = require('../models')

async function getPreTareaEsparragoDetalleVarioss (req, res) {
  const [err, preTareaEsparragoDetalleVarios] = await get(models.PreTareaEsparragoDetalleVarios.findAll({
    where: { estado: 'A' },
    include: [{ all: true }]
  }))
  if (err) return res.status(500).json({ message: 'err' })
  if (preTareaEsparragoDetalleVarios == null) return res.status(404).json({ message: 'PreTareaEsparragoDetalleVarioss nulos' })
  res.status(200).json(preTareaEsparragoDetalleVarios)
}

async function getPreTareaEsparragoDetalleVarios (req, res) {
  const [err, preTareaEsparragoDetalleVarios] = await get(models.PreTareaEsparragoDetalleVarios.findOne({
    where: { id: req.params.id, estado: 'A' },
    include: [{ all: true }]
  }))
  console.log(err)
  if (err) return res.status(500).json({ message: 'err' })
  if (preTareaEsparragoDetalleVarios == null) return res.status(404).json({ message: 'PreTareaEsparragoDetalleVarioss nulos' })
  res.status(200).json(preTareaEsparragoDetalleVarios)
}

async function createPreTareaEsparragoDetalleVarios (req, res) {
  const [err, preTareaEsparragoDetalleVarios] = await get(models.PreTareaEsparragoDetalleVarios.create({
    // all fields to insert

    accion: 'I',
    accion_usuario: 'Creo un nuevo pre_tarea_esparrago_detalle_varios.',
    ip: req.ip,
    usuario: 0
  }))
  if (err) return res.status(500).json({ message: 'err' })
  if (preTareaEsparragoDetalleVarios == null) return res.status(404).json({ message: 'PreTareaEsparragoDetalleVarioss nulos' })
  res.status(200).json(preTareaEsparragoDetalleVarios)
}

async function updatePreTareaEsparragoDetalleVarios (req, res) {
  const [err, preTareaEsparragoDetalleVarios] = await get(models.PreTareaEsparragoDetalleVarios.update({
    // all fields to update

    accion: 'U',
    accion_usuario: 'Edito un pre_tarea_esparrago_detalle_varios.',
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
  if (preTareaEsparragoDetalleVarios == null) return res.status(404).json({ message: 'PreTareaEsparragoDetalleVarioss nulos' })
  res.status(200).json(preTareaEsparragoDetalleVarios[1][0].dataValues)
}

async function deletePreTareaEsparragoDetalleVarios (req, res) {
  const [err, preTareaEsparragoDetalleVarios] = await get(models.PreTareaEsparragoDetalleVarios.update({
    estado: 'I',

    accion_usuario: 'Elimino un pre_tarea_esparrago_detalle_varios.',
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
  if (preTareaEsparragoDetalleVarios == null) return res.status(404).json({ message: 'PreTareaEsparragoDetalleVarioss nulos' })
  res.status(200).json(preTareaEsparragoDetalleVarios[1][0].dataValues)
}

function get (promise) {
  return promise.then(data => {
    return [null, data]
  })
    .catch(err => [err])
}

async function preTareaEsparragoDetalleVariosByRango (req, res) {
  console.log(req.body)
  const where = {
    fecha: {
      [models.Sequelize.Op.between]: [new Date(req.body.inicio).setUTCHours(0, 0, 0), new Date(req.body.fin).setUTCHours(23, 59, 59)]
    }
  }
  let wIn
  if (req.body.idcultivo === '-1') {
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

module.exports = {
  getPreTareaEsparragoDetalleVarioss,
  getPreTareaEsparragoDetalleVarios,
  createPreTareaEsparragoDetalleVarios,
  updatePreTareaEsparragoDetalleVarios,
  deletePreTareaEsparragoDetalleVarios,
  preTareaEsparragoDetalleVariosByRango
}
