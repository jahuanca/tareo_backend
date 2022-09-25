'use strict'
const models=require('../models')
const moment=require('moment')

async function getPersonal_Observado(req,res){
  let [err,personal_observados]=await get(models.Personal_Observado.findAll({

  }))
    if(err) return res.status(500).json({message: `${err}`})
    if(personal_observados==null) return res.status(404).json({message: `personal_observados nulos`})
    res.status(200).json(personal_observados)
  }

async function getPersonal_ObservadoCount(req,res){
  let [err,personal_observado]=await get(models.Personal_Observado.count({
    /* where:{estado: 'A'},*/
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(personal_observado==null) return res.status(404).json({message: `personal_observado nulos`})
  res.status(200).json(personal_observado)
}

async function getPersonal_ObservadoByLimitAndOffset(req,res){

  let [err,personal_observado]=await get(models.Personal_Observado.findAll({
    /* where:{estado: 'A'},*/
    offset: req.params.offset ? parseInt(req.params.offset) : 0,
    limit: req.params.limit ? parseInt(req.params.limit) : 10,
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(personal_observado==null) return res.status(404).json({message: `personal_observado nulos`})
  res.status(200).json(personal_observado)
}


  

async function getPersonal_Observado1(req,res){
  let [err,personal_observado]=await get(models.Personal_Observado.findOne({
    where:{dni: req.params.id,},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(personal_observado==null) return res.status(404).json({message: `personal_observado nulos`})
  res.status(200).json(personal_observado)
}
//0000679_ 218

/*async function getPersonal_EmpresaBySubdivision(req,res){
  let [err,personal_empresa]=await get(models.Personal_Empresa.findAll({
 
    include: [
      {model: models.PersonalEmpresa_Subdivision, where: {idsubdivision: req.params.id}, required: true}
    ]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(personal_empresa==null) return res.status(404).json({message: `Personal_Empresas nulos`})
  res.status(200).json(personal_empresa)
}*/

/*async function createPersonal_Observado(req,res){
  let [err,personal_observado]=await get(models.Personal_Empresa.create({
       //all fields to insert
      
      accion: 'I',
      accion_personal_empresa: 'Creo un nuevo personal_empresa.',
      ip: req.ip,
      personal_empresa: 0
  }))
  if(err) return res.status(500).json({message: `err`})
  if(personal_observado==null) return res.status(404).json({message: `personal_observado nulos`})
  res.status(200).json(personal_observado)
}


async function updatePersonal_Observado(req,res){
  let [err,personal_observado]=await get(models.personal_observado.update({
    //all fields to update
    
    accion: 'U',
    accion_personal_empresa: 'Edito un personal_empresa.',
    ip: req.ip,
    personal_empresa: 0
  },{
    where:{
      id: req.body.id, estado:'A'
    },
    individualHooks: true,
    validate: false
  }))
  if(err) return res.status(500).json({message: `err`})
  if(personal_empresa==null) return res.status(404).json({message: `Personal_Empresas nulos`})
  res.status(200).json(personal_empresa[1][0].dataValues)
}


async function deletePersonal_Observado(req,res){
  let [err,personal_empresa]=await get(models.Personal_Empresa.update({
    estado: 'I',

    accion_personal_empresa: 'Elimino un personal_empresa.',
    accion: 'D',
    ip: req.ip,
    personal_empresa: 0
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `err`})
  if(personal_empresa==null) return res.status(404).json({message: `Personal_Empresas nulos`})
  res.status(200).json(personal_empresa[1][0].dataValues)
}*/


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getPersonal_Observado,
  getPersonal_ObservadoCount,
  getPersonal_ObservadoByLimitAndOffset,
  //getPersonal_ObservadoBySubdivision,
  getPersonal_Observado1
  //createPersonal_Observado,
  //updatePersonal_Observado,
  //deletePersonal_Observado
}