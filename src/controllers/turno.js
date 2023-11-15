'use strict'
const logger = require('../config/logger')
const models=require('../models')
//const logger=require('./../config/logger')

async function getTurnosCount(req,res){
  let [err,turnos]=await get(models.Turno.count({
    where:{estado: 'A'},
  }))
  if(err){
   logger.error(`500 GET getTurnosCount, ${err}.`)
   return res.status(500).json({message: `${err}`})
  }
  if(turnos==null){
   logger.error(`404 GET getTurnosCount, turno nulos.`)
   return res.status(404).json({message: `turnos nulos`})
  }
  logger.info(`200 GET getTurnosCount, ${turnos.length} values.`)
  res.status(200).json(turnos)
}

async function getTurnosByLimitAndOffset(req,res){
  let [err,turnos]=await get(models.Turno.findAll({
    where:{estado: 'A'},
    offset: req.params.offset ? parseInt(req.params.offset) : 0,
    limit: req.params.limit ? parseInt(req.params.limit) : 10,
  }))
  if(err){
   logger.error(`500 GET getTurnosByLimitAndOffset, ${err}.`)
   return res.status(500).json({message: `${err}`})
  }
  if(turnos==null){
   logger.error(`404 GET getTurnosByLimitAndOffset, turno nulos.`)
   return res.status(404).json({message: `turnos nulos`})
  }
  logger.info(`200 GET getTurnosByLimitAndOffset, ${turnos.length} values.`)
  res.status(200).json(turnos)
}

async function getTurnos(req,res){
  let [err,turnos]=await get(models.Turno.findAll({
  }))
  if(err){
   logger.error(`500 GET getTurnos, ${err.toString()}.`)
   return res.status(500).json({message: `${err}`})
  }
  if(turnos==null){
   logger.error(`404 GET getTurnos, turno nulos.`)
   return res.status(404).json({message: `turnos nulos`})
  }
  logger.info(`200 GET getTurnos, ${turnos.length} values.`)
  res.status(200).json(turnos)
}

async function getTurno(req,res){
  let [err,turno]=await get(models.Turno.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  if(err){
   logger.error(`500 GET getTurno, ${err}.`)
   return res.status(500).json({message: `${err}`})
  }
  if(turno==null){
   logger.error(`400 GET getTurno, turno nulos.`)
   return res.status(404).json({message: `turno nulos`})
  }
  logger.info(`200 GET getTurno, ${turno.length} values.`)
  res.status(200).json(turno)
}

async function createTurno(req,res){
  let [err,turno]=await get(models.Turno.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo turno.',
      ip: req.ip,
      usuario: 0
  }))
  if(err){
   logger.error(`500 GET createTurno, ${err}.`)
   return res.status(500).json({message: `${err}`})
  }
  if(turno==null){
   logger.error(`400 GET createTurno, turno nulos.`)
   return res.status(404).json({message: `turno nulos`})
  }
  logger.info(`200 GET createTurno, ${turno.length} values.`)
  res.status(200).json(turno)
}

async function updateTurno(req,res){
  let [err,turno]=await get(models.Turno.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un turno.',
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
   logger.error(`500 PUT getTurnosCount, ${err}.`)
   return res.status(500).json({message: `${err}`})
  }
  if(turno==null){
   logger.error(`404 PUT updateTurno, turno nulos.`)
   return res.status(404).json({message: `turnos nulos`})
  }
  logger.info(`200 PUT updateTurno, ${turno[1][0].dataValues.length} values.`)
  res.status(200).json(turno[1][0].dataValues)
}

async function deleteTurno(req,res){
  let [err,turno]=await get(models.Turno.update({
    estado: 'I',

    accion_usuario: 'Elimino un turno.',
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
   logger.error(`500 DELETE getTurnosCount, ${err}.`)
   return res.status(500).json({message: `${err}`})
  }
  if(turno==null){
   logger.error(`404 DELETE deleteTurno, turno nulos.`)
   return res.status(404).json({message: `Turno nulos`})
  }
  logger.info(`200 DELETE deleteTurno, ${turno[1][0].length} values.`)
  res.status(200).json(turno[1][0].dataValues)
}

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getTurnosCount,
  getTurnosByLimitAndOffset,
  getTurnos,
  getTurno,
  createTurno,
  updateTurno,
  deleteTurno
}