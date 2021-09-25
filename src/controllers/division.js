'use strict'
const models=require('../models')

async function getDivisions(req,res){
  let [err,divisions]=await get(models.Division.findAll({
    /* where:{estado: 'A'}, */
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `err`})
  if(divisions==null) return res.status(404).json({message: `Divisions nulos`})
  res.status(200).json(divisions)
}

async function getDivision(req,res){
  let [err,division]=await get(models.Division.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `err`})
  if(division==null) return res.status(404).json({message: `Divisions nulos`})
  res.status(200).json(division)
}

async function createDivision(req,res){
  let [err,division]=await get(models.Division.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo division.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `err`})
  if(division==null) return res.status(404).json({message: `Divisions nulos`})
  res.status(200).json(division)
}


async function updateDivision(req,res){
  let [err,division]=await get(models.Division.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un division.',
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
  if(division==null) return res.status(404).json({message: `Divisions nulos`})
  res.status(200).json(division[1][0].dataValues)
}


async function deleteDivision(req,res){
  let [err,division]=await get(models.Division.update({
    estado: 'I',

    accion_usuario: 'Elimino un division.',
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
  if(division==null) return res.status(404).json({message: `Divisions nulos`})
  res.status(200).json(division[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getDivisions,
  getDivision,
  createDivision,
  updateDivision,
  deleteDivision
}