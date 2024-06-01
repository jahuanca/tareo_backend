'use strict'
const models=require('../models')

async function getTemp_Actividads(req,res){
  let [err,temp_actividads]=await get(models.Temp_Actividad.findAll({
    /* where:{estado: 'A'},
    include: [{all: true}] */
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(temp_actividads==null) return res.status(404).json({message: `Temp_Actividads nulos`})
  res.status(200).json(temp_actividads)
}

async function getTemp_Actividad(req,res){
  let [err,temp_actividad]=await get(models.Temp_Actividad.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `err`})
  if(temp_actividad==null) return res.status(404).json({message: `Temp_Actividads nulos`})
  res.status(200).json(temp_actividad)
}

async function createTemp_Actividad(req,res){
  let [err,temp_actividad]=await get(models.Temp_Actividad.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo temp_actividad.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `err`})
  if(temp_actividad==null) return res.status(404).json({message: `Temp_Actividads nulos`})
  res.status(200).json(temp_actividad)
}


async function updateTemp_Actividad(req,res){
  let [err,temp_actividad]=await get(models.Temp_Actividad.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un temp_actividad.',
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
  if(temp_actividad==null) return res.status(404).json({message: `Temp_Actividads nulos`})
  res.status(200).json(temp_actividad[1][0].dataValues)
}


async function deleteTemp_Actividad(req,res){
  let [err,temp_actividad]=await get(models.Temp_Actividad.update({
    estado: 'I',

    accion_usuario: 'Elimino un temp_actividad.',
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
  if(temp_actividad==null) return res.status(404).json({message: `Temp_Actividads nulos`})
  res.status(200).json(temp_actividad[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getTemp_Actividads,
  getTemp_Actividad,
  createTemp_Actividad,
  updateTemp_Actividad,
  deleteTemp_Actividad
}