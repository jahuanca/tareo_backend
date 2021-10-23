'use strict'
const models=require('../models')

async function getCentro_Costos(req,res){
  let [err,centro_costos]=await get(models.Centro_Costo.findAll({
    /* where:{estado: 'A'},
    include: [{all: true}] */
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(centro_costos==null) return res.status(404).json({message: `Centro_Costos nulos`})
  res.status(200).json(centro_costos)
}

async function getCentro_Costo(req,res){
  let [err,centro_costo]=await get(models.Centro_Costo.findOne({
    where:{idcentrocosto: req.params.id},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `err`})
  if(centro_costo==null) return res.status(404).json({message: `Centro_Costos nulos`})
  res.status(200).json(centro_costo)
}

async function createCentro_Costo(req,res){
  let [err,centro_costo]=await get(models.Centro_Costo.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo centro_costo.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `err`})
  if(centro_costo==null) return res.status(404).json({message: `Centro_Costos nulos`})
  res.status(200).json(centro_costo)
}


async function updateCentro_Costo(req,res){
  let [err,centro_costo]=await get(models.Centro_Costo.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un centro_costo.',
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
  if(centro_costo==null) return res.status(404).json({message: `Centro_Costos nulos`})
  res.status(200).json(centro_costo[1][0].dataValues)
}


async function deleteCentro_Costo(req,res){
  let [err,centro_costo]=await get(models.Centro_Costo.update({
    estado: 'I',

    accion_usuario: 'Elimino un centro_costo.',
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
  if(centro_costo==null) return res.status(404).json({message: `Centro_Costos nulos`})
  res.status(200).json(centro_costo[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getCentro_Costos,
  getCentro_Costo,
  createCentro_Costo,
  updateCentro_Costo,
  deleteCentro_Costo
}