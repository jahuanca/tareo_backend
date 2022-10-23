'use strict'
const models=require('../models')

async function getPersonal_Pre_Tarea_EsparragosCount(req,res){
  let [err,personal_pre_tarea_esparragos]=await get(models.Personal_Pre_Tarea_Esparrago.count({
    where:{estado: 'A'},
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(personal_pre_tarea_esparragos==null) return res.status(404).json({message: `Personal_Pre_Tarea_Esparragos nulos`})
  res.status(200).json(personal_pre_tarea_esparragos)
}

async function getPersonal_Pre_Tarea_EsparragosByLimitAndOffset(req,res){
  let [err,personal_pre_tarea_esparragos]=await get(models.Personal_Pre_Tarea_Esparrago.findAll({
    where:{estado: 'A'},
    offset: req.params.offset ? parseInt(req.params.offset) : 0,
    limit: req.params.limit ? parseInt(req.params.limit) : 10,
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(personal_pre_tarea_esparragos==null) return res.status(404).json({message: `Personal_Pre_Tarea_Esparragos nulos`})
  res.status(200).json(personal_pre_tarea_esparragos)
}

async function getPersonal_Pre_Tarea_Esparragos(req,res){
  let [err,personal_pre_tarea_esparragos]=await get(models.Personal_Pre_Tarea_Esparrago.findAll({
    /* where:{estado: 'A'},
    include: [{all: true}] */
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(personal_pre_tarea_esparragos==null) return res.status(404).json({message: `Personal_Pre_Tarea_Esparragos nulos`})
  res.status(200).json(personal_pre_tarea_esparragos)
}

async function getPersonal_Pre_Tarea_Esparragos_Acumulativos(req,res){
  let [err,personal_pre_tarea_esparragos]=await get(models.Personal_Pre_Tarea_Esparrago.findAll({
    raw: true,
    attributes: [
      'idcliente',
      'idlabor',
      'idcalibre',
      'mesa',
      'linea',
      'fecha',
      /*[models.sequelize.fn("COUNT", models.sequelize.col("mesa")), "cantidad"],*/],
    group: [
      'idcliente',
      'idlabor',
      'fecha',
      'idcalibre',
      'mesa',
      'linea',
    ],
    include: [
      {
        model: models.Cliente, attributes: ['abreviatura'],
      }
    ]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(personal_pre_tarea_esparragos==null) return res.status(404).json({message: `Personal_Pre_Tarea_Esparragos nulos`})
  res.status(200).json(personal_pre_tarea_esparragos)
}

async function getPersonal_Pre_Tarea_Esparrago(req,res){
  let [err,personal_pre_tarea_esparrago]=await get(models.Personal_Pre_Tarea_Esparrago.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `${err}`})
  if(personal_pre_tarea_esparrago==null) return res.status(404).json({message: `Personal_Pre_Tarea_Esparragos nulos`})
  res.status(200).json(personal_pre_tarea_esparrago)
}

async function createPersonal_Pre_Tarea_Esparrago(req,res){
  let [err,personal_pre_tarea_esparrago]=await get(models.Personal_Pre_Tarea_Esparrago.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo personal_pre_tarea_esparrago.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(personal_pre_tarea_esparrago==null) return res.status(404).json({message: `Personal_Pre_Tarea_Esparragos nulos`})
  res.status(200).json(personal_pre_tarea_esparrago)
}


async function updatePersonal_Pre_Tarea_Esparrago(req,res){
  let [err,personal_pre_tarea_esparrago]=await get(models.Personal_Pre_Tarea_Esparrago.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un personal_pre_tarea_esparrago.',
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
  if(personal_pre_tarea_esparrago==null) return res.status(404).json({message: `Personal_Pre_Tarea_Esparragos nulos`})
  res.status(200).json(personal_pre_tarea_esparrago[1][0].dataValues)
}


async function deletePersonal_Pre_Tarea_Esparrago(req,res){
  let [err,personal_pre_tarea_esparrago]=await get(models.Personal_Pre_Tarea_Esparrago.update({
    estado: 'I',

    accion_usuario: 'Elimino un personal_pre_tarea_esparrago.',
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
  if(personal_pre_tarea_esparrago==null) return res.status(404).json({message: `Personal_Pre_Tarea_Esparragos nulos`})
  res.status(200).json(personal_pre_tarea_esparrago[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getPersonal_Pre_Tarea_EsparragosCount,
  getPersonal_Pre_Tarea_EsparragosByLimitAndOffset,
  getPersonal_Pre_Tarea_Esparragos,
  getPersonal_Pre_Tarea_Esparragos_Acumulativos,
  getPersonal_Pre_Tarea_Esparrago,
  createPersonal_Pre_Tarea_Esparrago,
  updatePersonal_Pre_Tarea_Esparrago,
  deletePersonal_Pre_Tarea_Esparrago
}