'use strict'
const models=require('../models')

async function getPre_Tareo_Proceso_Detalles(req,res){
  let [err,pre_tareo_proceso_detalles]=await get(models.Pre_Tareo_Proceso_Detalle.findAll({
    /* where:{estado: 'A'}, */
  }))
  if(err) return res.status(500).json({message: `err`})
  if(pre_tareo_proceso_detalles==null) return res.status(404).json({message: `Pre_Tareo_Proceso_Detalles nulos`})
  res.status(200).json(pre_tareo_proceso_detalles)
}

async function getPre_Tareo_Proceso_Detalle(req,res){
  let [err,pre_tareo_proceso_detalle]=await get(models.Pre_Tareo_Proceso_Detalle.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `err`})
  if(pre_tareo_proceso_detalle==null) return res.status(404).json({message: `Pre_Tareo_Proceso_Detalles nulos`})
  res.status(200).json(pre_tareo_proceso_detalle)
}

async function createPre_Tareo_Proceso_Detalle(req,res){
  let [err,pre_tareo_proceso_detalle]=await get(models.Pre_Tareo_Proceso_Detalle.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo pre_tareo_proceso_detalle.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `err`})
  if(pre_tareo_proceso_detalle==null) return res.status(404).json({message: `Pre_Tareo_Proceso_Detalles nulos`})
  res.status(200).json(pre_tareo_proceso_detalle)
}


async function updatePre_Tareo_Proceso_Detalle(req,res){
  let [err,pre_tareo_proceso_detalle]=await get(models.Pre_Tareo_Proceso_Detalle.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un pre_tareo_proceso_detalle.',
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
  if(pre_tareo_proceso_detalle==null) return res.status(404).json({message: `Pre_Tareo_Proceso_Detalles nulos`})
  res.status(200).json(pre_tareo_proceso_detalle[1][0].dataValues)
}


async function deletePre_Tareo_Proceso_Detalle(req,res){
  let [err,pre_tareo_proceso_detalle]=await get(models.Pre_Tareo_Proceso_Detalle.update({
    estado: 'I',

    accion_usuario: 'Elimino un pre_tareo_proceso_detalle.',
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
  if(pre_tareo_proceso_detalle==null) return res.status(404).json({message: `Pre_Tareo_Proceso_Detalles nulos`})
  res.status(200).json(pre_tareo_proceso_detalle[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getPre_Tareo_Proceso_Detalles,
  getPre_Tareo_Proceso_Detalle,
  createPre_Tareo_Proceso_Detalle,
  updatePre_Tareo_Proceso_Detalle,
  deletePre_Tareo_Proceso_Detalle
}