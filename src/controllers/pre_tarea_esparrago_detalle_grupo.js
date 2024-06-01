'use strict'
const models=require('../models')

async function getPreTareaEsparragoDetalleGrupos(req,res){
  let [err,pre_tarea_esparrago_detalle_grupos]=await get(models.PreTareaEsparragoDetalleGrupo.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(pre_tarea_esparrago_detalle_grupos==null) return res.status(404).json({message: `PreTareaEsparragoDetalleGrupos nulos`})
  res.status(200).json(pre_tarea_esparrago_detalle_grupos)
}

async function getPreTareaEsparragoDetalleGrupo(req,res){
  let [err,pre_tarea_esparrago_detalle_grupo]=await get(models.PreTareaEsparragoDetalleGrupo.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `${err}`})
  if(pre_tarea_esparrago_detalle_grupo==null) return res.status(404).json({message: `PreTareaEsparragoDetalleGrupos nulos`})
  res.status(200).json(pre_tarea_esparrago_detalle_grupo)
}

async function createPreTareaEsparragoDetalleGrupo(req,res){
  let [err,pre_tarea_esparrago_detalle_grupo]=await get(models.PreTareaEsparragoDetalleGrupo.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo pre_tarea_esparrago_detalle_grupo.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(pre_tarea_esparrago_detalle_grupo==null) return res.status(404).json({message: `PreTareaEsparragoDetalleGrupos nulos`})
  res.status(200).json(pre_tarea_esparrago_detalle_grupo)
}


async function updatePreTareaEsparragoDetalleGrupo(req,res){
  let [err,pre_tarea_esparrago_detalle_grupo]=await get(models.PreTareaEsparragoDetalleGrupo.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un pre_tarea_esparrago_detalle_grupo.',
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
  if(pre_tarea_esparrago_detalle_grupo==null) return res.status(404).json({message: `PreTareaEsparragoDetalleGrupos nulos`})
  res.status(200).json(pre_tarea_esparrago_detalle_grupo[1][0].dataValues)
}


async function deletePreTareaEsparragoDetalleGrupo(req,res){
  let [err,pre_tarea_esparrago_detalle_grupo]=await get(models.PreTareaEsparragoDetalleGrupo.update({
    estado: 'I',

    accion_usuario: 'Elimino un pre_tarea_esparrago_detalle_grupo.',
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
  if(pre_tarea_esparrago_detalle_grupo==null) return res.status(404).json({message: `PreTareaEsparragoDetalleGrupos nulos`})
  res.status(200).json(pre_tarea_esparrago_detalle_grupo[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getPreTareaEsparragoDetalleGrupos,
  getPreTareaEsparragoDetalleGrupo,
  createPreTareaEsparragoDetalleGrupo,
  updatePreTareaEsparragoDetalleGrupo,
  deletePreTareaEsparragoDetalleGrupo
}