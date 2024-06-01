'use strict'
const models=require('../models')

async function getPresentacion_LineaCount(req,res){
  let [err,presentacion_lineas]=await get(models.Presentacion_Linea.count({
    /* where:{estado: 'A'},*/
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(presentacion_lineas==null) return res.status(404).json({message: `presentacion_lineas nulos`})
  res.status(200).json(presentacion_lineas)
}

async function getPresentacion_LineaByLimitAndOffset(req,res){

  let [err,presentacion_lineas]=await get(models.Presentacion_Linea.findAll({
    /* where:{estado: 'A'},*/
    offset: req.params.offset ? parseInt(req.params.offset) : 0,
    limit: req.params.limit ? parseInt(req.params.limit) : 10,
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(presentacion_lineas==null) return res.status(404).json({message: `presentacion_lineas nulos`})
  res.status(200).json(presentacion_lineas)
}

async function getPresentacion_Lineas(req,res){
  let [err,presentacion_lineas]=await get(models.Presentacion_Linea.findAll({
    /* where:{estado: 'A'}, */
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `err`})
  if(presentacion_lineas==null) return res.status(404).json({message: `Presentacion_Lineas nulos`})
  res.status(200).json(presentacion_lineas)
}

async function getPresentacion_Linea(req,res){
  let [err,presentacion_linea]=await get(models.Presentacion_Linea.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err);
  if(err) return res.status(500).json({message: `err`})
  if(presentacion_linea==null) return res.status(404).json({message: `Presentacion_Lineas nulos`})
  res.status(200).json(presentacion_linea)
}

async function createPresentacion_Linea(req,res){
  let [err,presentacion_linea]=await get(models.Presentacion_Linea.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo presentacion_linea.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `err`})
  if(presentacion_linea==null) return res.status(404).json({message: `Presentacion_Lineas nulos`})
  res.status(200).json(presentacion_linea)
}


async function updatePresentacion_Linea(req,res){
  let [err,presentacion_linea]=await get(models.Presentacion_Linea.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un presentacion_linea.',
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
  if(presentacion_linea==null) return res.status(404).json({message: `Presentacion_Lineas nulos`})
  res.status(200).json(presentacion_linea[1][0].dataValues)
}


async function deletePresentacion_Linea(req,res){
  let [err,presentacion_linea]=await get(models.Presentacion_Linea.update({
    estado: 'I',

    accion_usuario: 'Elimino un presentacion_linea.',
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
  if(presentacion_linea==null) return res.status(404).json({message: `Presentacion_Lineas nulos`})
  res.status(200).json(presentacion_linea[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getPresentacion_Lineas,
  getPresentacion_Linea,
  getPresentacion_LineaByLimitAndOffset,
  getPresentacion_LineaCount,
  //createPresentacion_Linea,
  //updatePresentacion_Linea,
  //deletePresentacion_Linea
}