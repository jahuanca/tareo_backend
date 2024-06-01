'use strict'
const models=require('../models')
const logger = require('../config/logger')

async function getActividadsCount(req,res){
  let [err,actividads]=await get(models.Actividad.count({
    where:{activo: true},
    /* where:{estado: 'A'},*/
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(actividads==null) return res.status(404).json({message: `Actividads nulos`})
  res.status(200).json(actividads)
}

async function getActividadsByLimitAndOffset(req,res){
  let [err,actividads]=await get(models.Actividad.findAll({
    where:{activo: true},
    /* where:{estado: 'A'},*/
    include: [{all: true}],
    offset: req.params.offset ? parseInt(req.params.offset) : 0,
    limit: req.params.limit ? parseInt(req.params.limit) : 10,
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(actividads==null) return res.status(404).json({message: `Actividads nulos`})
  res.status(200).json(actividads)
}

async function getActividads(req,res){
  let [err,actividads]=await get(models.Actividad.findAll({
    where:{activo: true},
    /* where:{estado: 'A'},
    include: [{all: true}] */
  }))
  if(err) return res.status(500).json({message: `err`})
  if(actividads==null) return res.status(404).json({message: `Actividads nulos`})
  res.status(200).json(actividads)
}

async function getActividad(req,res){
  let [err,actividad]=await get(models.Actividad.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `err`})
  if(actividad==null) return res.status(404).json({message: `Actividads nulos`})
  res.status(200).json(actividad)
}

async function createActividad(req,res){
  let [err,actividad]=await get(models.Actividad.create({
       //all fields to insert
      
      accion: 'I',
      accion_actividad: 'Creo un nuevo actividad.',
      ip: req.ip,
      actividad: 0
  }))
  if(err) return res.status(500).json({message: `err`})
  if(actividad==null) return res.status(404).json({message: `Actividads nulos`})
  res.status(200).json(actividad)
}


async function updateActividad(req,res){
  let [err,actividad]=await get(models.Actividad.update({
    //all fields to update
    
    accion: 'U',
    accion_actividad: 'Edito un actividad.',
    ip: req.ip,
    actividad: 0
  },{
    where:{
      id: req.body.id, estado:'A'
    },
    individualHooks: true,
    validate: false
  }))
  if(err) return res.status(500).json({message: `err`})
  if(actividad==null) return res.status(404).json({message: `Actividads nulos`})
  res.status(200).json(actividad[1][0].dataValues)
}


async function deleteActividad(req,res){
  let [err,actividad]=await get(models.Actividad.update({
    estado: 'I',

    accion_actividad: 'Elimino un actividad.',
    accion: 'D',
    ip: req.ip,
    actividad: 0
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `err`})
  if(actividad==null) return res.status(404).json({message: `Actividads nulos`})
  res.status(200).json(actividad[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getActividadsCount,
  getActividadsByLimitAndOffset,
  getActividads,
  getActividad,
  createActividad,
  updateActividad,
  deleteActividad
}