'use strict'
const models=require('../models')

async function getClientes(req,res){
  let [err,clientes]=await get(models.Cliente.findAll({
    /* where:{estado: 'A'}, */
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(clientes==null) return res.status(404).json({message: `Clientes nulos`})
  res.status(200).json(clientes)
}

async function getCliente(req,res){
  let [err,cliente]=await get(models.Cliente.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `err`})
  if(cliente==null) return res.status(404).json({message: `Clientes nulos`})
  res.status(200).json(cliente)
}

async function createCliente(req,res){
  let [err,cliente]=await get(models.Cliente.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo cliente.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `err`})
  if(cliente==null) return res.status(404).json({message: `Clientes nulos`})
  res.status(200).json(cliente)
}


async function updateCliente(req,res){
  let [err,cliente]=await get(models.Cliente.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un cliente.',
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
  if(cliente==null) return res.status(404).json({message: `Clientes nulos`})
  res.status(200).json(cliente[1][0].dataValues)
}


async function deleteCliente(req,res){
  let [err,cliente]=await get(models.Cliente.update({
    estado: 'I',

    accion_usuario: 'Elimino un cliente.',
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
  if(cliente==null) return res.status(404).json({message: `Clientes nulos`})
  res.status(200).json(cliente[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getClientes,
  getCliente,
  createCliente,
  updateCliente,
  deleteCliente
}