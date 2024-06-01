'use strict'
const models=require('../models')

async function getEstadosCount(req,res){
  let [err,estados]=await get(models.Estado.count({
    where:{estado: 'A'},
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(estados==null) return res.status(404).json({message: `Estados nulos`})
  res.status(200).json(estados)
}

async function getEstadosByLimitAndOffset(req,res){
  let [err,estados]=await get(models.Estado.findAll({
    where:{estado: 'A'},
    offset: req.params.offset ? parseInt(req.params.offset) : 0,
    limit: req.params.limit ? parseInt(req.params.limit) : 10,
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(estados==null) return res.status(404).json({message: `Estados nulos`})
  res.status(200).json(estados)
}

async function getEstados(req,res){
  let [err,estados]=await get(models.Estado.findAll({
    /* where:{estado: 'A'},
    include: [{all: true}] */
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(estados==null) return res.status(404).json({message: `Estados nulos`})
  res.status(200).json(estados)
}

async function getEstado(req,res){
  let [err,estado]=await get(models.Estado.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `${err}`})
  if(estado==null) return res.status(404).json({message: `Estados nulos`})
  res.status(200).json(estado)
}

async function createEstado(req,res){
  let [err,estado]=await get(models.Estado.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo estado.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(estado==null) return res.status(404).json({message: `Estados nulos`})
  res.status(200).json(estado)
}


async function updateEstado(req,res){
  let [err,estado]=await get(models.Estado.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un estado.',
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
  if(estado==null) return res.status(404).json({message: `Estados nulos`})
  res.status(200).json(estado[1][0].dataValues)
}


async function deleteEstado(req,res){
  let [err,estado]=await get(models.Estado.update({
    estado: 'I',

    accion_usuario: 'Elimino un estado.',
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
  if(estado==null) return res.status(404).json({message: `Estados nulos`})
  res.status(200).json(estado[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getEstadosCount,
  getEstadosByLimitAndOffset,
  getEstados,
  getEstado,
  createEstado,
  updateEstado,
  deleteEstado
}