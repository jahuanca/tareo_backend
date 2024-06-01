'use strict'
const models=require('../models')

async function getCalibresCount(req,res){
  let [err,calibres]=await get(models.Calibre.count({
    where:{estado: 'A'},
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(calibres==null) return res.status(404).json({message: `Calibres nulos`})
  res.status(200).json(calibres)
}

async function getCalibresByLimitAndOffset(req,res){
  let [err,calibres]=await get(models.Calibre.findAll({
    where:{estado: 'A'},
    offset: req.params.offset ? parseInt(req.params.offset) : 0,
    limit: req.params.limit ? parseInt(req.params.limit) : 10,
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(calibres==null) return res.status(404).json({message: `Calibres nulos`})
  res.status(200).json(calibres)
}

async function getCalibres(req,res){
  let [err,calibres]=await get(models.Calibre.findAll({
    /* where:{estado: 'A'},
    include: [{all: true}] */
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(calibres==null) return res.status(404).json({message: `Calibres nulos`})
  res.status(200).json(calibres)
}

async function getCalibre(req,res){
  let [err,calibre]=await get(models.Calibre.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `${err}`})
  if(calibre==null) return res.status(404).json({message: `Calibres nulos`})
  res.status(200).json(calibre)
}

async function createCalibre(req,res){
  let [err,calibre]=await get(models.Calibre.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo calibre.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(calibre==null) return res.status(404).json({message: `Calibres nulos`})
  res.status(200).json(calibre)
}


async function updateCalibre(req,res){
  let [err,calibre]=await get(models.Calibre.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un calibre.',
    ip: req.ip,
    usuario: 0
  },{
    where:{
      id: req.body.id, estado:'A'
    },
    individualHooks: true,
    validate: false
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(calibre==null) return res.status(404).json({message: `Calibres nulos`})
  res.status(200).json(calibre[1][0].dataValues)
}


async function deleteCalibre(req,res){
  let [err,calibre]=await get(models.Calibre.update({
    estado: 'I',

    accion_usuario: 'Elimino un calibre.',
    accion: 'D',
    ip: req.ip,
    usuario: 0
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(calibre==null) return res.status(404).json({message: `Calibres nulos`})
  res.status(200).json(calibre[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getCalibresCount,
  getCalibresByLimitAndOffset,
  getCalibres,
  getCalibre,
  createCalibre,
  updateCalibre,
  deleteCalibre
}