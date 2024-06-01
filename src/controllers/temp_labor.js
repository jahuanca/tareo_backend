'use strict'
const models=require('../models')

async function getTemp_Labors(req,res){
  let [err,temp_labors]=await get(models.Temp_Labor.findAll({
    /* where:{estado: 'A'},
    include: [{all: true}] */
  }))
  if(err) return res.status(500).json({message: `err`})
  if(temp_labors==null) return res.status(404).json({message: `Temp_Labors nulos`})
  res.status(200).json(temp_labors)
}

async function getTemp_Labor(req,res){
  let [err,temp_labor]=await get(models.Temp_Labor.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `err`})
  if(temp_labor==null) return res.status(404).json({message: `Temp_Labors nulos`})
  res.status(200).json(temp_labor)
}

async function createTemp_Labor(req,res){
  let [err,temp_labor]=await get(models.Temp_Labor.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo temp_labor.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `err`})
  if(temp_labor==null) return res.status(404).json({message: `Temp_Labors nulos`})
  res.status(200).json(temp_labor)
}


async function updateTemp_Labor(req,res){
  let [err,temp_labor]=await get(models.Temp_Labor.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un temp_labor.',
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
  if(temp_labor==null) return res.status(404).json({message: `Temp_Labors nulos`})
  res.status(200).json(temp_labor[1][0].dataValues)
}


async function deleteTemp_Labor(req,res){
  let [err,temp_labor]=await get(models.Temp_Labor.update({
    estado: 'I',

    accion_usuario: 'Elimino un temp_labor.',
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
  if(temp_labor==null) return res.status(404).json({message: `Temp_Labors nulos`})
  res.status(200).json(temp_labor[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getTemp_Labors,
  getTemp_Labor,
  createTemp_Labor,
  updateTemp_Labor,
  deleteTemp_Labor
}