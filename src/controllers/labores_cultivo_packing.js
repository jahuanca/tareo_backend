'use strict'
const models=require('../models')

async function getLabores_Cultivo_Packings(req,res){
  let [err,labores_cultivo_packings]=await get(models.Labores_Cultivo_Packing.findAll({
    /* where:{estado: 'A'}, */
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `err`})
  if(labores_cultivo_packings==null) return res.status(404).json({message: `Labores_Cultivo_Packings nulos`})
  res.status(200).json(labores_cultivo_packings)
}

async function getLabores_Cultivo_Packing(req,res){
  let [err,labores_cultivo_packing]=await get(models.Labores_Cultivo_Packing.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `err`})
  if(labores_cultivo_packing==null) return res.status(404).json({message: `Labores_Cultivo_Packings nulos`})
  res.status(200).json(labores_cultivo_packing)
}

async function createLabores_Cultivo_Packing(req,res){
  let [err,labores_cultivo_packing]=await get(models.Labores_Cultivo_Packing.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo labores_cultivo_packing.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `err`})
  if(labores_cultivo_packing==null) return res.status(404).json({message: `Labores_Cultivo_Packings nulos`})
  res.status(200).json(labores_cultivo_packing)
}


async function updateLabores_Cultivo_Packing(req,res){
  let [err,labores_cultivo_packing]=await get(models.Labores_Cultivo_Packing.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un labores_cultivo_packing.',
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
  if(labores_cultivo_packing==null) return res.status(404).json({message: `Labores_Cultivo_Packings nulos`})
  res.status(200).json(labores_cultivo_packing[1][0].dataValues)
}


async function deleteLabores_Cultivo_Packing(req,res){
  let [err,labores_cultivo_packing]=await get(models.Labores_Cultivo_Packing.update({
    estado: 'I',

    accion_usuario: 'Elimino un labores_cultivo_packing.',
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
  if(labores_cultivo_packing==null) return res.status(404).json({message: `Labores_Cultivo_Packings nulos`})
  res.status(200).json(labores_cultivo_packing[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getLabores_Cultivo_Packings,
  getLabores_Cultivo_Packing,
  createLabores_Cultivo_Packing,
  updateLabores_Cultivo_Packing,
  deleteLabores_Cultivo_Packing
}