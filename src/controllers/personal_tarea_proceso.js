'use strict'
const models=require('../models')

async function getPersonalTareaProcesos(req,res){
  let [err,personalTareaProcesos]=await get(models.PersonalTareaProceso.findAll({
    /* where:{estado: 'A'}, */
    /* include: [{all: true}] */
  }))
  if(err) return res.status(500).json({message: `err`})
  if(personalTareaProcesos==null) return res.status(404).json({message: `PersonalTareaProcesos nulos`})
  res.status(200).json(personalTareaProcesos)
}

async function getPersonalTareaProceso(req,res){
  let [err,personalTareaProceso]=await get(models.PersonalTareaProceso.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `err`})
  if(personalTareaProceso==null) return res.status(404).json({message: `PersonalTareaProcesos nulos`})
  res.status(200).json(personalTareaProceso)
}

async function personalTareaProcesoByRango(req,res){
  console.log(req.body);
  let [err,personalTareaProceso]=await get(models.PersonalTareaProceso.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `err`})
  if(personalTareaProceso==null) return res.status(404).json({message: `PersonalTareaProcesos nulos`})
  res.status(200).json(personalTareaProceso)
}

async function createPersonalTareaProceso(req,res){
  let [err,personalTareaProceso]=await get(models.PersonalTareaProceso.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo personalTareaProceso.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `err`})
  if(personalTareaProceso==null) return res.status(404).json({message: `PersonalTareaProcesos nulos`})
  res.status(200).json(personalTareaProceso)
}


async function updatePersonalTareaProceso(req,res){
  let [err,personalTareaProceso]=await get(models.PersonalTareaProceso.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un personalTareaProceso.',
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
  if(personalTareaProceso==null) return res.status(404).json({message: `PersonalTareaProcesos nulos`})
  res.status(200).json(personalTareaProceso[1][0].dataValues)
}


async function deletePersonalTareaProceso(req,res){
  let [err,personalTareaProceso]=await get(models.PersonalTareaProceso.update({
    estado: 'I',

    accion_usuario: 'Elimino un personalTareaProceso.',
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
  if(personalTareaProceso==null) return res.status(404).json({message: `PersonalTareaProcesos nulos`})
  res.status(200).json(personalTareaProceso[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getPersonalTareaProcesos,
  getPersonalTareaProceso,
  createPersonalTareaProceso,
  updatePersonalTareaProceso,
  deletePersonalTareaProceso,
  personalTareaProcesoByRango,
}