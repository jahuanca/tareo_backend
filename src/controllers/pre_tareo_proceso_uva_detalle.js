'use strict'
const models = require('../models')

async function getPre_Tareo_Proceso_Uva_Detalles(req, res) {
  let [err, name_mins] = await get(models.Pre_Tareo_Proceso_Uva_Detalle.findAll({
    where: { estado: 'A' },
    include: [{ all: true }]
  }))
  if (err) return res.status(500).json({ message: `err` })
  if (name_mins == null) return res.status(404).json({ message: `Pre_Tareo_Proceso_Uva_Detalles nulos` })
  res.status(200).json(name_mins)
}

async function preTareaProcesoUvaDetalleByRango(req, res) {
  console.log(req.body)
  let where = {
    fecha: {
      [models.Sequelize.Op.between]: [new Date(req.body.inicio).setHours(0, 0, 0), new Date(req.body.fin).setHours(23, 59, 59)]
    }
  };
  let wIn;
  if (req.body.idcultivo == '-1') {
    wIn = { model: models.Pre_Tareo_Proceso_Uva, include: [{ model: models.Cultivo }] };
  } else {
    wIn = { model: models.Pre_Tareo_Proceso_Uva, where: { idcultivo: req.body.idcultivo }, required: true, include: [{ model: models.Cultivo }] };
  }

  let [err, pretareoProcesoUva] = await get(models.Pre_Tareo_Proceso_Uva_Detalle.findAll({
    where: where,
    include: [wIn, { model: models.Labor }, {
      model: models.Actividad,
    }]
  }))
  if (err) return res.status(500).json({ message: `${err}` })
  if (pretareoProcesoUva == null) return res.status(404).json({ message: `Packing nulos` })
  res.status(200).json(pretareoProcesoUva)
}

async function getPre_Tareo_Proceso_Uva_Detalle(req, res) {
  let [err, name_min] = await get(models.Pre_Tareo_Proceso_Uva_Detalle.findOne({
    where: { id: req.params.id, estado: 'A' },
    include: [{ all: true }]
  }))
  console.log(err)
  if (err) return res.status(500).json({ message: `err` })
  if (name_min == null) return res.status(404).json({ message: `Pre_Tareo_Proceso_Uva_Detalles nulos` })
  res.status(200).json(name_min)
}

async function createPre_Tareo_Proceso_Uva_Detalle(req, res) {
  let [err, name_min] = await get(models.Pre_Tareo_Proceso_Uva_Detalle.create({
    //all fields to insert

    accion: 'I',
    accion_usuario: 'Creo un nuevo name_min.',
    ip: req.ip,
    usuario: 0
  }))
  if (err) return res.status(500).json({ message: `err` })
  if (name_min == null) return res.status(404).json({ message: `Pre_Tareo_Proceso_Uva_Detalles nulos` })
  res.status(200).json(name_min)
}


async function updatePre_Tareo_Proceso_Uva_Detalle(req, res) {
  let [err, name_min] = await get(models.Pre_Tareo_Proceso_Uva_Detalle.update({
    //all fields to update

    accion: 'U',
    accion_usuario: 'Edito un name_min.',
    ip: req.ip,
    usuario: 0
  }, {
    where: {
      id: req.body.id, estado: 'A'
    },
    individualHooks: true,
    validate: false
  }))
  if (err) return res.status(500).json({ message: `err` })
  if (name_min == null) return res.status(404).json({ message: `Pre_Tareo_Proceso_Uva_Detalles nulos` })
  res.status(200).json(name_min[1][0].dataValues)
}


async function deletePre_Tareo_Proceso_Uva_Detalle(req, res) {
  let [err, name_min] = await get(models.Pre_Tareo_Proceso_Uva_Detalle.update({
    estado: 'I',

    accion_usuario: 'Elimino un name_min.',
    accion: 'D',
    ip: req.ip,
    usuario: 0
  }, {
    where: {
      id: req.params.id, estado: 'A'
    },
    individualHooks: true
  }))
  if (err) return res.status(500).json({ message: `err` })
  if (name_min == null) return res.status(404).json({ message: `Pre_Tareo_Proceso_Uva_Detalles nulos` })
  res.status(200).json(name_min[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
    return [null, data];
  })
    .catch(err => [err]);
}

module.exports = {
  getPre_Tareo_Proceso_Uva_Detalles,
  getPre_Tareo_Proceso_Uva_Detalle,
  createPre_Tareo_Proceso_Uva_Detalle,
  updatePre_Tareo_Proceso_Uva_Detalle,
  deletePre_Tareo_Proceso_Uva_Detalle,
  preTareaProcesoUvaDetalleByRango,
}