'use strict'
const models=require('../models')

async function getCultivos(req,res){
  let [err,cultivos]=await get(models.Cultivo.findAll({
    /* where:{estado: 'A'}, */
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `err`})
  if(cultivos==null) return res.status(404).json({message: `Cultivos nulos`})
  res.status(200).json(cultivos)
}

async function getCultivo(req,res){
  let [err,cultivo]=await get(models.Cultivo.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `err`})
  if(cultivo==null) return res.status(404).json({message: `Cultivos nulos`})
  res.status(200).json(cultivo)
}

async function createCultivo(req,res){
  let [err,cultivo]=await get(models.Cultivo.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo cultivo.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `err`})
  if(cultivo==null) return res.status(404).json({message: `Cultivos nulos`})
  res.status(200).json(cultivo)
}


async function updateCultivo(req,res){
  let [err,cultivo]=await get(models.Cultivo.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un cultivo.',
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
  if(cultivo==null) return res.status(404).json({message: `Cultivos nulos`})
  res.status(200).json(cultivo[1][0].dataValues)
}


async function deleteCultivo(req,res){
  let [err,cultivo]=await get(models.Cultivo.update({
    estado: 'I',

    accion_usuario: 'Elimino un cultivo.',
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
  if(cultivo==null) return res.status(404).json({message: `Cultivos nulos`})
  res.status(200).json(cultivo[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getCultivos,
  getCultivo,
  createCultivo,
  updateCultivo,
  deleteCultivo
}