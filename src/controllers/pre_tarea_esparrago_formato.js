'use strict'
const models=require('../models')

async function getPreTareaEsparragoFormatos(req,res){
  let [err,pre_tarea_esparrago_formatos]=await get(models.PreTareaEsparragoFormato.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(pre_tarea_esparrago_formatos==null) return res.status(404).json({message: `PreTareaEsparragoFormatos nulos`})
  res.status(200).json(pre_tarea_esparrago_formatos)
}

async function getPreTareaEsparragoFormato(req,res){
  let [err,pre_tarea_esparrago_formato]=await get(models.PreTareaEsparragoFormato.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `${err}`})
  if(pre_tarea_esparrago_formato==null) return res.status(404).json({message: `PreTareaEsparragoFormatos nulos`})
  res.status(200).json(pre_tarea_esparrago_formato)
}

async function createPreTareaEsparragoFormato(req,res){
  let [err,pre_tarea_esparrago_formato]=await get(models.PreTareaEsparragoFormato.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo pre_tarea_esparrago_formato.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(pre_tarea_esparrago_formato==null) return res.status(404).json({message: `PreTareaEsparragoFormatos nulos`})
  res.status(200).json(pre_tarea_esparrago_formato)
}


async function updatePreTareaEsparragoFormato(req,res){
  let [err,pre_tarea_esparrago_formato]=await get(models.PreTareaEsparragoFormato.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un pre_tarea_esparrago_formato.',
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
  if(pre_tarea_esparrago_formato==null) return res.status(404).json({message: `PreTareaEsparragoFormatos nulos`})
  res.status(200).json(pre_tarea_esparrago_formato[1][0].dataValues)
}


async function deletePreTareaEsparragoFormato(req,res){
  let [err,pre_tarea_esparrago_formato]=await get(models.PreTareaEsparragoFormato.update({
    estado: 'I',

    accion_usuario: 'Elimino un pre_tarea_esparrago_formato.',
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
  if(pre_tarea_esparrago_formato==null) return res.status(404).json({message: `PreTareaEsparragoFormatos nulos`})
  res.status(200).json(pre_tarea_esparrago_formato[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getPreTareaEsparragoFormatos,
  getPreTareaEsparragoFormato,
  createPreTareaEsparragoFormato,
  updatePreTareaEsparragoFormato,
  deletePreTareaEsparragoFormato
}