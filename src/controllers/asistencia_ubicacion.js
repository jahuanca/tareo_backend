'use strict'
const models=require('../models')
const logger=require('./../config/logger')

async function getAsistenciaUbicacionsCount(req,res){
  let [err,asistenciaUbicacions]=await get(models.AsistenciaUbicacion.count({
    where:{estado: 'A'},
  }))
  if(err){
   logger.error(`500 GET getAsistenciaUbicacionsCount, ${err}.`)
   return res.status(500).json({message: `${err}`})
  }
  if(asistenciaUbicacions==null){
   logger.error(`404 GET getAsistenciaUbicacionsCount, asistenciaUbicacions nulos.`)
   return res.status(404).json({message: `asistenciaUbicacions nulos`})
  }
  logger.info(`200 GET getAsistenciaUbicacionsCount, ${asistenciaUbicacions.length} values.`)
  res.status(200).json(asistenciaUbicacions)
}

async function getAsistenciaUbicacionsByLimitAndOffset(req,res){
  let [err,asistenciaUbicacions]=await get(models.AsistenciaUbicacion.findAll({
    where:{estado: 'A'},
    offset: req.params.offset ? parseInt(req.params.offset) : 0,
    limit: req.params.limit ? parseInt(req.params.limit) : 10,
  }))
  if(err){
   logger.error(`500 GET getAsistenciaUbicacionsByLimitAndOffset, ${err}.`)
   return res.status(500).json({message: `${err}`})
  }
  if(asistenciaUbicacions==null){
   logger.error(`404 GET getAsistenciaUbicacionsByLimitAndOffset, asistenciaUbicacions nulos.`)
   return res.status(404).json({message: `asistenciaUbicacions nulos`})
  }
  logger.info(`200 GET getAsistenciaUbicacionsByLimitAndOffset, ${asistenciaUbicacions.length} values.`)
  res.status(200).json(asistenciaUbicacions)
}

async function getAsistenciaUbicacions(req,res){
  let [err,asistenciaUbicacions]=await get(models.AsistenciaUbicacion.findAll({
    include: [{all: true}]
  }))
  if(err){
   logger.error(`500 GET getAsistenciaUbicacions, ${err}.`)
   return res.status(500).json({message: `${err}`})
  }
  if(asistenciaUbicacions==null){
   logger.error(`404 GET getAsistenciaUbicacions, asistenciaUbicacions nulos.`)
   return res.status(404).json({message: `asistenciaUbicacions nulos`})
  }
  logger.info(`200 GET getAsistenciaUbicacions, ${asistenciaUbicacions.length} values.`)
  res.status(200).json(asistenciaUbicacions)
}

async function getAsistenciaUbicacion(req,res){
  let [err,asistenciaUbicacion]=await get(models.AsistenciaUbicacion.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  if(err){
   logger.error(`500 GET getAsistenciaUbicacion, ${err}.`)
   return res.status(500).json({message: `${err}`})
  }
  if(asistenciaUbicacion==null){
   logger.error(`400 GET getAsistenciaUbicacion, asistenciaUbicacion nulos.`)
   return res.status(404).json({message: `asistenciaUbicacion nulos`})
  }
  logger.info(`200 GET getAsistenciaUbicacion, ${asistenciaUbicacion.length} values.`)
  res.status(200).json(asistenciaUbicacion)
}

async function createAsistenciaUbicacion(req,res){
  let [err,asistenciaUbicacion]=await get(models.AsistenciaUbicacion.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo asistenciaUbicacion.',
      ip: req.ip,
      usuario: 0
  }))
  if(err){
   logger.error(`500 GET createAsistenciaUbicacion, ${err}.`)
   return res.status(500).json({message: `${err}`})
  }
  if(asistenciaUbicacion==null){
   logger.error(`400 GET createAsistenciaUbicacion, asistenciaUbicacion nulos.`)
   return res.status(404).json({message: `asistenciaUbicacion nulos`})
  }
  logger.info(`200 GET createAsistenciaUbicacion, ${asistenciaUbicacion.length} values.`)
  res.status(200).json(asistenciaUbicacion)
}

async function updateAsistenciaUbicacion(req,res){
  let [err,asistenciaUbicacion]=await get(models.AsistenciaUbicacion.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un asistenciaUbicacion.',
    ip: req.ip,
    usuario: 0
  },{
    where:{
      id: req.body.id, estado:'A'
    },
    individualHooks: true,
    validate: false
  }))
  if(err){
   logger.error(`500 PUT getAsistenciaUbicacionsCount, ${err}.`)
   return res.status(500).json({message: `${err}`})
  }
  if(asistenciaUbicacion==null){
   logger.error(`404 PUT updateAsistenciaUbicacion, asistenciaUbicacion nulos.`)
   return res.status(404).json({message: `asistenciaUbicacions nulos`})
  }
  logger.info(`200 PUT updateAsistenciaUbicacion, ${asistenciaUbicacion[1][0].dataValues.length} values.`)
  res.status(200).json(asistenciaUbicacion[1][0].dataValues)
}

async function deleteAsistenciaUbicacion(req,res){
  let [err,asistenciaUbicacion]=await get(models.AsistenciaUbicacion.update({
    estado: 'I',

    accion_usuario: 'Elimino un asistenciaUbicacion.',
    accion: 'D',
    ip: req.ip,
    usuario: 0
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err){
   logger.error(`500 DELETE getAsistenciaUbicacionsCount, ${err}.`)
   return res.status(500).json({message: `${err}`})
  }
  if(asistenciaUbicacion==null){
   logger.error(`404 DELETE deleteAsistenciaUbicacion, asistenciaUbicacion nulos.`)
   return res.status(404).json({message: `AsistenciaUbicacion nulos`})
  }
  logger.info(`200 DELETE deleteAsistenciaUbicacion, ${asistenciaUbicacion[1][0].length} values.`)
  res.status(200).json(asistenciaUbicacion[1][0].dataValues)
}

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getAsistenciaUbicacionsCount,
  getAsistenciaUbicacionsByLimitAndOffset,
  getAsistenciaUbicacions,
  getAsistenciaUbicacion,
  createAsistenciaUbicacion,
  updateAsistenciaUbicacion,
  deleteAsistenciaUbicacion
}