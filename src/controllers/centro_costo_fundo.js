'use strict'
const models=require('../models')

async function getCentro_Costo_Fundos(req,res){
  let [err,centro_costo_fundos]=await get(models.Centro_Costo_Fundo.findAll({
    /* where:{estado: 'A'},
    include: [{all: true}] */
  }))
  if(err) return res.status(500).json({message: `err`})
  if(centro_costo_fundos==null) return res.status(404).json({message: `Centro_Costo_Fundos nulos`})
  res.status(200).json(centro_costo_fundos)
}

async function getCentro_Costo_Fundo(req,res){
  let [err,centro_costo_fundo]=await get(models.Centro_Costo_Fundo.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `err`})
  if(centro_costo_fundo==null) return res.status(404).json({message: `Centro_Costo_Fundos nulos`})
  res.status(200).json(centro_costo_fundo)
}

async function createCentro_Costo_Fundo(req,res){
  let [err,centro_costo_fundo]=await get(models.Centro_Costo_Fundo.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo centro_costo_fundo.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `err`})
  if(centro_costo_fundo==null) return res.status(404).json({message: `Centro_Costo_Fundos nulos`})
  res.status(200).json(centro_costo_fundo)
}


async function updateCentro_Costo_Fundo(req,res){
  let [err,centro_costo_fundo]=await get(models.Centro_Costo_Fundo.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un centro_costo_fundo.',
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
  if(centro_costo_fundo==null) return res.status(404).json({message: `Centro_Costo_Fundos nulos`})
  res.status(200).json(centro_costo_fundo[1][0].dataValues)
}


async function deleteCentro_Costo_Fundo(req,res){
  let [err,centro_costo_fundo]=await get(models.Centro_Costo_Fundo.update({
    estado: 'I',

    accion_usuario: 'Elimino un centro_costo_fundo.',
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
  if(centro_costo_fundo==null) return res.status(404).json({message: `Centro_Costo_Fundos nulos`})
  res.status(200).json(centro_costo_fundo[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getCentro_Costo_Fundos,
  getCentro_Costo_Fundo,
  createCentro_Costo_Fundo,
  updateCentro_Costo_Fundo,
  deleteCentro_Costo_Fundo
}