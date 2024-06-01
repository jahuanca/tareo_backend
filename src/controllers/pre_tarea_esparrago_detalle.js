
'use strict'
const models=require('../models')

async function getPreTareaEsparragoDetalles(req,res){
  let [err,pre_tarea_esparrago_detalles]=await get(models.PreTareaEsparragoDetalle.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(pre_tarea_esparrago_detalles==null) return res.status(404).json({message: `PreTareaEsparragoDetalles nulos`})
  res.status(200).json(pre_tarea_esparrago_detalles)
}

async function getPreTareaEsparragoDetalle(req,res){
  let [err,pre_tarea_esparrago_detalle]=await get(models.PreTareaEsparragoDetalle.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `${err}`})
  if(pre_tarea_esparrago_detalle==null) return res.status(404).json({message: `PreTareaEsparragoDetalles nulos`})
  res.status(200).json(pre_tarea_esparrago_detalle)
}

async function createPreTareaEsparragoDetalle(req,res){
  let [err,pre_tarea_esparrago_detalle]=await get(models.PreTareaEsparragoDetalle.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo pre_tarea_esparrago_detalle.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(pre_tarea_esparrago_detalle==null) return res.status(404).json({message: `PreTareaEsparragoDetalles nulos`})
  res.status(200).json(pre_tarea_esparrago_detalle)
}


async function updatePreTareaEsparragoDetalle(req,res){
  let [err,pre_tarea_esparrago_detalle]=await get(models.PreTareaEsparragoDetalle.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un pre_tarea_esparrago_detalle.',
    ip: req.ip,
    usuario: 0
  },{
    where:{
      id: req.body.id, estado:'A'
    },
    individualHooks: true,
    validate: false
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(pre_tarea_esparrago_detalle==null) return res.status(404).json({message: `PreTareaEsparragoDetalles nulos`})
  res.status(200).json(pre_tarea_esparrago_detalle[1][0].dataValues)
}


async function deletePreTareaEsparragoDetalle(req,res){
  let [err,pre_tarea_esparrago_detalle]=await get(models.PreTareaEsparragoDetalle.update({
    estado: 'I',

    accion_usuario: 'Elimino un pre_tarea_esparrago_detalle.',
    accion: 'D',
    ip: req.ip,
    usuario: 0
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(pre_tarea_esparrago_detalle==null) return res.status(404).json({message: `PreTareaEsparragoDetalles nulos`})
  res.status(200).json(pre_tarea_esparrago_detalle[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getPreTareaEsparragoDetalles,
  getPreTareaEsparragoDetalle,
  createPreTareaEsparragoDetalle,
  updatePreTareaEsparragoDetalle,
  deletePreTareaEsparragoDetalle
}