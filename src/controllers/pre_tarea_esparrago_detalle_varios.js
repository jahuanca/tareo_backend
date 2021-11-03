
'use strict'
const models=require('../models')

async function getPreTareaEsparragoDetalleVarioss(req,res){
  let [err,pre_tarea_esparrago_detalle_varioss]=await get(models.PreTareaEsparragoDetalleVarios.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `err`})
  if(pre_tarea_esparrago_detalle_varioss==null) return res.status(404).json({message: `PreTareaEsparragoDetalleVarioss nulos`})
  res.status(200).json(pre_tarea_esparrago_detalle_varioss)
}

async function getPreTareaEsparragoDetalleVarios(req,res){
  let [err,pre_tarea_esparrago_detalle_varios]=await get(models.PreTareaEsparragoDetalleVarios.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `err`})
  if(pre_tarea_esparrago_detalle_varios==null) return res.status(404).json({message: `PreTareaEsparragoDetalleVarioss nulos`})
  res.status(200).json(pre_tarea_esparrago_detalle_varios)
}

async function createPreTareaEsparragoDetalleVarios(req,res){
  let [err,pre_tarea_esparrago_detalle_varios]=await get(models.PreTareaEsparragoDetalleVarios.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo pre_tarea_esparrago_detalle_varios.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `err`})
  if(pre_tarea_esparrago_detalle_varios==null) return res.status(404).json({message: `PreTareaEsparragoDetalleVarioss nulos`})
  res.status(200).json(pre_tarea_esparrago_detalle_varios)
}


async function updatePreTareaEsparragoDetalleVarios(req,res){
  let [err,pre_tarea_esparrago_detalle_varios]=await get(models.PreTareaEsparragoDetalleVarios.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un pre_tarea_esparrago_detalle_varios.',
    ip: req.ip,
    usuario: 0
  },{
    where:{
      id: req.body.id, estado:'A'
    },
    individualHooks: true,
    validate: false
  }))
  if(err) return res.status(500).json({message: `err`})
  if(pre_tarea_esparrago_detalle_varios==null) return res.status(404).json({message: `PreTareaEsparragoDetalleVarioss nulos`})
  res.status(200).json(pre_tarea_esparrago_detalle_varios[1][0].dataValues)
}


async function deletePreTareaEsparragoDetalleVarios(req,res){
  let [err,pre_tarea_esparrago_detalle_varios]=await get(models.PreTareaEsparragoDetalleVarios.update({
    estado: 'I',

    accion_usuario: 'Elimino un pre_tarea_esparrago_detalle_varios.',
    accion: 'D',
    ip: req.ip,
    usuario: 0
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `err`})
  if(pre_tarea_esparrago_detalle_varios==null) return res.status(404).json({message: `PreTareaEsparragoDetalleVarioss nulos`})
  res.status(200).json(pre_tarea_esparrago_detalle_varios[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getPreTareaEsparragoDetalleVarioss,
  getPreTareaEsparragoDetalleVarios,
  createPreTareaEsparragoDetalleVarios,
  updatePreTareaEsparragoDetalleVarios,
  deletePreTareaEsparragoDetalleVarios
}