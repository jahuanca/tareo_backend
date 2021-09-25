'use strict'
const models=require('../models')

async function getPersonalEmpresa_Subdivisions(req,res){
  let [err,personalempresa_subdivisions]=await get(models.PersonalEmpresa_Subdivision.findAll({
    /* where:{estado: 'A'},
    include: [{all: true}] */
  }))
  if(err) return res.status(500).json({message: `err`})
  if(personalempresa_subdivisions==null) return res.status(404).json({message: `PersonalEmpresa_Subdivisions nulos`})
  res.status(200).json(personalempresa_subdivisions)
}

async function getPersonalEmpresa_Subdivision(req,res){
  let [err,personalempresa_subdivision]=await get(models.PersonalEmpresa_Subdivision.findOne({
    /* where:{id: req.params.id, estado: 'A'},
    include: [{all: true}] */
  }))
  if(err) return res.status(500).json({message: `err`})
  if(personalempresa_subdivision==null) return res.status(404).json({message: `PersonalEmpresa_Subdivisions nulos`})
  res.status(200).json(personalempresa_subdivision)
}

async function getPersonalEmpresa_SubdivisionBySubdivision(req,res){
    let [err,personalempresa_subdivision]=await get(models.PersonalEmpresa_Subdivision.findAll({
      where:{idsubdivision: req.params.id, activo: true},
      include: [{all: true}]
    }))
    if(err) return res.status(500).json({message: `${err}`})
    if(personalempresa_subdivision==null) return res.status(404).json({message: `PersonalEmpresa_Subdivisions nulos`})
    res.status(200).json(personalempresa_subdivision)
  }

async function createPersonalEmpresa_Subdivision(req,res){
  let [err,personalempresa_subdivision]=await get(models.PersonalEmpresa_Subdivision.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo personalempresa_subdivision.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `err`})
  if(personalempresa_subdivision==null) return res.status(404).json({message: `PersonalEmpresa_Subdivisions nulos`})
  res.status(200).json(personalempresa_subdivision)
}


async function updatePersonalEmpresa_Subdivision(req,res){
  let [err,personalempresa_subdivision]=await get(models.PersonalEmpresa_Subdivision.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un personalempresa_subdivision.',
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
  if(personalempresa_subdivision==null) return res.status(404).json({message: `PersonalEmpresa_Subdivisions nulos`})
  res.status(200).json(personalempresa_subdivision[1][0].dataValues)
}


async function deletePersonalEmpresa_Subdivision(req,res){
  let [err,personalempresa_subdivision]=await get(models.PersonalEmpresa_Subdivision.update({
    estado: 'I',

    accion_usuario: 'Elimino un personalempresa_subdivision.',
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
  if(personalempresa_subdivision==null) return res.status(404).json({message: `PersonalEmpresa_Subdivisions nulos`})
  res.status(200).json(personalempresa_subdivision[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getPersonalEmpresa_Subdivisions,
  getPersonalEmpresa_SubdivisionBySubdivision,
  getPersonalEmpresa_Subdivision,
  createPersonalEmpresa_Subdivision,
  updatePersonalEmpresa_Subdivision,
  deletePersonalEmpresa_Subdivision
}