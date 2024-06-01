'use strict'
const models=require('../models')

async function getTipo_Tareas(req,res){
  let [err,tipo_tareas]=await get(models.Tipo_Tarea.findAll({
    /* where:{estado: 'A'}, */
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `err`})
  if(tipo_tareas==null) return res.status(404).json({message: `Tipo_Tareas nulos`})
  res.status(200).json(tipo_tareas)
}

async function getTipo_Tarea(req,res){
  let [err,tipo_tarea]=await get(models.Tipo_Tarea.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `err`})
  if(tipo_tarea==null) return res.status(404).json({message: `Tipo_Tareas nulos`})
  res.status(200).json(tipo_tarea)
}

async function createTipo_Tarea(req,res){
  let [err,tipo_tarea]=await get(models.Tipo_Tarea.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo tipo_tarea.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `err`})
  if(tipo_tarea==null) return res.status(404).json({message: `Tipo_Tareas nulos`})
  res.status(200).json(tipo_tarea)
}


async function updateTipo_Tarea(req,res){
  let [err,tipo_tarea]=await get(models.Tipo_Tarea.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un tipo_tarea.',
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
  if(tipo_tarea==null) return res.status(404).json({message: `Tipo_Tareas nulos`})
  res.status(200).json(tipo_tarea[1][0].dataValues)
}


async function deleteTipo_Tarea(req,res){
  let [err,tipo_tarea]=await get(models.Tipo_Tarea.update({
    estado: 'I',

    accion_usuario: 'Elimino un tipo_tarea.',
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
  if(tipo_tarea==null) return res.status(404).json({message: `Tipo_Tareas nulos`})
  res.status(200).json(tipo_tarea[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getTipo_Tareas,
  getTipo_Tarea,
  createTipo_Tarea,
  updateTipo_Tarea,
  deleteTipo_Tarea
}