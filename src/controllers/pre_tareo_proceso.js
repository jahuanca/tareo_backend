'use strict'
const models=require('../models')

async function getPre_Tareo_Procesos(req,res){
  let [err,pre_tareo_procesos]=await get(models.Pre_Tareo_Proceso.findAll({
    /* where:{estado: 'A'}, */
    /* order: [['fechamod','DESC']], */
    include: [
        {model: models.Centro_Costo},
        {model: models.Labores_Cultivo_Packing, include: [{all: true}]}
    ]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(pre_tareo_procesos==null) return res.status(404).json({message: `Pre_Tareo_Procesos nulos`})
  res.status(200).json(pre_tareo_procesos)
}

async function getPre_Tareo_Proceso(req,res){
  let [err,pre_tareo_proceso]=await get(models.Pre_Tareo_Proceso.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `err`})
  if(pre_tareo_proceso==null) return res.status(404).json({message: `Pre_Tareo_Procesos nulos`})
  res.status(200).json(pre_tareo_proceso)
}

async function createPre_Tareo_Proceso(req,res){
  let [err,pre_tareo_proceso]=await get(models.Pre_Tareo_Proceso.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo pre_tareo_proceso.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `err`})
  if(pre_tareo_proceso==null) return res.status(404).json({message: `Pre_Tareo_Procesos nulos`})
  res.status(200).json(pre_tareo_proceso)
}

async function createAllPreTareoProceso(req, res) {
  try {
      console.log(req.body.Pre_Tareo_Proceso_Detalles);
      const result = await models.sequelize.transaction(async (t) => {
          
          if (req.body.Pre_Tareo_Proceso_Detalles) {
           await models.Pre_Tareo_Proceso_Detalle.bulkCreate(req.body.Pre_Tareo_Proceso_Detalles, { transaction: t });
          }
          return {};
      });
      res.status(200).json(result)
  } catch (error) {
      console.log(error);
      return res.status(500).json({ message: `Error en el servidor ${error}` })
  }
}


async function updatePre_Tareo_Proceso(req,res){
  let [err,pre_tareo_proceso]=await get(models.Pre_Tareo_Proceso.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un pre_tareo_proceso.',
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
  if(pre_tareo_proceso==null) return res.status(404).json({message: `Pre_Tareo_Procesos nulos`})
  res.status(200).json(pre_tareo_proceso[1][0].dataValues)
}


async function deletePre_Tareo_Proceso(req,res){
  let [err,pre_tareo_proceso]=await get(models.Pre_Tareo_Proceso.update({
    estado: 'I',

    accion_usuario: 'Elimino un pre_tareo_proceso.',
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
  if(pre_tareo_proceso==null) return res.status(404).json({message: `Pre_Tareo_Procesos nulos`})
  res.status(200).json(pre_tareo_proceso[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getPre_Tareo_Procesos,
  getPre_Tareo_Proceso,
  createPre_Tareo_Proceso,
  createAllPreTareoProceso,
  updatePre_Tareo_Proceso,
  deletePre_Tareo_Proceso
}