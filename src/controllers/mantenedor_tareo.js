'use strict'
const models=require('../models')

async function getMantenedor_Tareos(req,res){
  let [err,mantenedor_tareos]=await get(models.Mantenedor_Tareo.findAll({
    /* where:{estado: 'A'}, */
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(mantenedor_tareos==null) return res.status(404).json({message: `Mantenedor_Tareos nulos`})
  res.status(200).json(mantenedor_tareos)
}

async function getMantenedor_Tareo(req,res){
  let [err,mantenedor_tareo]=await get(models.Mantenedor_Tareo.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `err`})
  if(mantenedor_tareo==null) return res.status(404).json({message: `Mantenedor_Tareos nulos`})
  res.status(200).json(mantenedor_tareo)
}

async function createMantenedor_Tareo(req,res){
  let [err,mantenedor_tareo]=await get(models.Mantenedor_Tareo.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo mantenedor_tareo.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `err`})
  if(mantenedor_tareo==null) return res.status(404).json({message: `Mantenedor_Tareos nulos`})
  res.status(200).json(mantenedor_tareo)
}


async function updateMantenedor_Tareo(req,res){
  let [err,mantenedor_tareo]=await get(models.Mantenedor_Tareo.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un mantenedor_tareo.',
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
  if(mantenedor_tareo==null) return res.status(404).json({message: `Mantenedor_Tareos nulos`})
  res.status(200).json(mantenedor_tareo[1][0].dataValues)
}


async function deleteMantenedor_Tareo(req,res){
  let [err,mantenedor_tareo]=await get(models.Mantenedor_Tareo.update({
    estado: 'I',

    accion_usuario: 'Elimino un mantenedor_tareo.',
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
  if(mantenedor_tareo==null) return res.status(404).json({message: `Mantenedor_Tareos nulos`})
  res.status(200).json(mantenedor_tareo[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getMantenedor_Tareos,
  getMantenedor_Tareo,
  createMantenedor_Tareo,
  updateMantenedor_Tareo,
  deleteMantenedor_Tareo
}