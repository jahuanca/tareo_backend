'use strict'
const models=require('../models')

async function getVia_EnviosCount(req,res){
  let [err,via_envios]=await get(models.Via_Envio.count({
    where:{estado: 'A'},
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(via_envios==null) return res.status(404).json({message: `Via_Envios nulos`})
  res.status(200).json(via_envios)
}

async function getVia_EnviosByLimitAndOffset(req,res){
  let [err,via_envios]=await get(models.Via_Envio.findAll({
    where:{estado: 'A'},
    offset: req.params.offset ? parseInt(req.params.offset) : 0,
    limit: req.params.limit ? parseInt(req.params.limit) : 10,
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(via_envios==null) return res.status(404).json({message: `Via_Envios nulos`})
  res.status(200).json(via_envios)
}

async function getVia_Envios(req,res){
  let [err,via_envios]=await get(models.Via_Envio.findAll({
    /* where:{estado: 'A'},
    include: [{all: true}] */
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(via_envios==null) return res.status(404).json({message: `Via_Envios nulos`})
  res.status(200).json(via_envios)
}

async function getVia_Envio(req,res){
  let [err,via_envio]=await get(models.Via_Envio.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `${err}`})
  if(via_envio==null) return res.status(404).json({message: `Via_Envios nulos`})
  res.status(200).json(via_envio)
}

async function createVia_Envio(req,res){
  let [err,via_envio]=await get(models.Via_Envio.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo via_envio.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(via_envio==null) return res.status(404).json({message: `Via_Envios nulos`})
  res.status(200).json(via_envio)
}


async function updateVia_Envio(req,res){
  let [err,via_envio]=await get(models.Via_Envio.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un via_envio.',
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
  if(via_envio==null) return res.status(404).json({message: `Via_Envios nulos`})
  res.status(200).json(via_envio[1][0].dataValues)
}


async function deleteVia_Envio(req,res){
  let [err,via_envio]=await get(models.Via_Envio.update({
    estado: 'I',

    accion_usuario: 'Elimino un via_envio.',
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
  if(via_envio==null) return res.status(404).json({message: `Via_Envios nulos`})
  res.status(200).json(via_envio[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getVia_EnviosCount,
  getVia_EnviosByLimitAndOffset,
  getVia_Envios,
  getVia_Envio,
  createVia_Envio,
  updateVia_Envio,
  deleteVia_Envio
}