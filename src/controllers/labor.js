'use strict'
const models=require('../models')

async function getLabors(req,res){
  let [err,labors]=await get(models.Labor.findAll({
    /* where:{estado: 'A'},
    include: [{all: true}] */
  }))
  if(err) return res.status(500).json({message: `err`})
  if(labors==null) return res.status(404).json({message: `Labors nulos`})
  res.status(200).json(labors)
}

async function getLabor(req,res){
  let [err,labor]=await get(models.Labor.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `err`})
  if(labor==null) return res.status(404).json({message: `Labors nulos`})
  res.status(200).json(labor)
}

async function createLabor(req,res){
  let [err,labor]=await get(models.Labor.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo labor.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `err`})
  if(labor==null) return res.status(404).json({message: `Labors nulos`})
  res.status(200).json(labor)
}


async function updateLabor(req,res){
  let [err,labor]=await get(models.Labor.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un labor.',
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
  if(labor==null) return res.status(404).json({message: `Labors nulos`})
  res.status(200).json(labor[1][0].dataValues)
}


async function deleteLabor(req,res){
  let [err,labor]=await get(models.Labor.update({
    estado: 'I',

    accion_usuario: 'Elimino un labor.',
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
  if(labor==null) return res.status(404).json({message: `Labors nulos`})
  res.status(200).json(labor[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getLabors,
  getLabor,
  createLabor,
  updateLabor,
  deleteLabor
}