'use strict'
const models=require('../models')

async function getEsparrago_Agrupa_Personals(req,res){
  let [err,esparrago_agrupa_personals]=await get(models.Esparrago_Agrupa_Personal.findAll({
    /* where:{estado: 'A'}, */
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(esparrago_agrupa_personals==null) return res.status(404).json({message: `Esparrago_Agrupa_Personals nulos`})
  res.status(200).json(esparrago_agrupa_personals)
}

async function getEsparrago_Agrupa_Personal(req,res){
  let [err,esparrago_agrupa_personal]=await get(models.Esparrago_Agrupa_Personal.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `${err}`})
  if(esparrago_agrupa_personal==null) return res.status(404).json({message: `Esparrago_Agrupa_Personals nulos`})
  res.status(200).json(esparrago_agrupa_personal)
}

async function createEsparrago_Agrupa_Personal(req,res){
  let [err,esparrago_agrupa_personal]=await get(models.Esparrago_Agrupa_Personal.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo esparrago_agrupa_personal.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(esparrago_agrupa_personal==null) return res.status(404).json({message: `Esparrago_Agrupa_Personals nulos`})
  res.status(200).json(esparrago_agrupa_personal)
}


async function updateEsparrago_Agrupa_Personal(req,res){
  let [err,esparrago_agrupa_personal]=await get(models.Esparrago_Agrupa_Personal.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un esparrago_agrupa_personal.',
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
  if(esparrago_agrupa_personal==null) return res.status(404).json({message: `Esparrago_Agrupa_Personals nulos`})
  res.status(200).json(esparrago_agrupa_personal[1][0].dataValues)
}


async function deleteEsparrago_Agrupa_Personal(req,res){
  let [err,esparrago_agrupa_personal]=await get(models.Esparrago_Agrupa_Personal.update({
    estado: 'I',

    accion_usuario: 'Elimino un esparrago_agrupa_personal.',
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
  if(esparrago_agrupa_personal==null) return res.status(404).json({message: `Esparrago_Agrupa_Personals nulos`})
  res.status(200).json(esparrago_agrupa_personal[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getEsparrago_Agrupa_Personals,
  getEsparrago_Agrupa_Personal,
  createEsparrago_Agrupa_Personal,
  updateEsparrago_Agrupa_Personal,
  deleteEsparrago_Agrupa_Personal
}