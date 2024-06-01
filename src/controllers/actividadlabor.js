'use strict'
const models=require('../models')

async function getActividadLaborCount(req,res){
  let [err,actividadlabor]=await get(models.ActividadLabor.count({
    /* where:{estado: 'A'},*/
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(actividadlabor==null) return res.status(404).json({message: `ActividadLabor nulos`})
  res.status(200).json(actividadlabor)
}

async function getActividadLaborByLimitAndOffset(req,res){
  let [err,actividadlabor]=await get(models.ActividadLabor.findAll({
    /* where:{estado: 'A'},*/
    include: [{all: true}],
    offset: req.params.offset ? parseInt(req.params.offset) : 0,
    limit: req.params.limit ? parseInt(req.params.limit) : 10,
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(actividadlabor==null) return res.status(404).json({message: `ActividadLabor nulos`})
  res.status(200).json(actividadlabor)
}

async function getActividadLabores(req,res){
  let [err,actividadlabor]=await get(models.ActividadLabor.findAll({
    /* where:{estado: 'A'},
    include: [{all: true}] */
  }))
  if(err) return res.status(500).json({message: `err`})
  if(actividadlabor==null) return res.status(404).json({message: `ActividadLabor nulos`})
  res.status(200).json(actividadlabor)
}

async function getActividadLabor(req,res){
  let [err,actividadlabor]=await get(models.ActividadLabor.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `err`})
  if(actividadlabor==null) return res.status(404).json({message: `ActividadLabor nulos`})
  res.status(200).json(actividadlabor)
}

async function createActividadLabor(req,res){
  let [err,actividadlabor]=await get(models.ActividadLabor.create({
       //all fields to insert
      
      accion: 'I',
      accion_actividad: 'Creo un nuevo actividad.',
      ip: req.ip,
      actividad: 0
  }))
  if(err) return res.status(500).json({message: `err`})
  if(actividadlabor==null) return res.status(404).json({message: `Actividads nulos`})
  res.status(200).json(actividadlabor)
}


async function updateActividadLabor(req,res){
  let [err,actividadlabor]=await get(models.ActividadLabor.update({
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
  if(actividadlabor==null) return res.status(404).json({message: `ActividadLabor nulos`})
  res.status(200).json(actividadlabor[1][0].dataValues)
}


async function deleteActividadLabor(req,res){
  let [err,actividadlabor]=await get(models.ActividadLabor.update({
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
  if(actividadlabor==null) return res.status(404).json({message: `actividadlabor nulos`})
  res.status(200).json(actividadlabor[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getActividadLaborCount,
  getActividadLaborByLimitAndOffset,
  getActividadLabores,
  getActividadLabor,
  createActividadLabor,
  updateActividadLabor,
  deleteActividadLabor
}
