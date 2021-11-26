'use strict'
const models=require('../models')

async function getPreTareoEsparragos(req,res){
  let [err,pre_tareo_esparragos]=await get(models.PreTareoEsparrago.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(pre_tareo_esparragos==null) return res.status(404).json({message: `PreTareoEsparragos nulos`})
  res.status(200).json(pre_tareo_esparragos)
}

async function getPreTareoEsparrago(req,res){
  let [err,pre_tareo_esparrago]=await get(models.PreTareoEsparrago.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `${err}`})
  if(pre_tareo_esparrago==null) return res.status(404).json({message: `PreTareoEsparragos nulos`})
  res.status(200).json(pre_tareo_esparrago)
}

async function createPreTareoEsparrago(req,res){
  let [err,pre_tareo_esparrago]=await get(models.PreTareoEsparrago.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo pre_tareo_esparrago.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(pre_tareo_esparrago==null) return res.status(404).json({message: `PreTareoEsparragos nulos`})
  res.status(200).json(pre_tareo_esparrago)
}


async function updatePreTareoEsparrago(req,res){
  let [err,pre_tareo_esparrago]=await get(models.PreTareoEsparrago.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un pre_tareo_esparrago.',
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
  if(pre_tareo_esparrago==null) return res.status(404).json({message: `PreTareoEsparragos nulos`})
  res.status(200).json(pre_tareo_esparrago[1][0].dataValues)
}


async function deletePreTareoEsparrago(req,res){
  let [err,pre_tareo_esparrago]=await get(models.PreTareoEsparrago.update({
    estado: 'I',

    accion_usuario: 'Elimino un pre_tareo_esparrago.',
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
  if(pre_tareo_esparrago==null) return res.status(404).json({message: `PreTareoEsparragos nulos`})
  res.status(200).json(pre_tareo_esparrago[1][0].dataValues)
}

async function uploadFilePreTareaEsparrago(req, res) {

  let [err, pretareoProcesoUva] = await get(models.Pre_Tarea_Esparrago.update({
    firmasupervisor: req.file.filename,

    accion: 'U',
    accion_usuario: 'Edito un preTareaEsparrago.',
    ip: req.ip,
    usuario: 0
  }, {
    where: {
      itempretareaesparrago: req.body.itempretareaesparrago
    },
    individualHooks: true,
    validate: false
  }))
  /* console.log(err); */
  if (err) return res.status(500).json({ message: `${err}` })
  if (pretareoProcesoUva == null) return res.status(404).json({ message: `Pretareos nulos` })
  res.status(200).json(pretareoProcesoUva[1][0].dataValues)
}

async function createAllPreTareaEsparrago(req, res) {
  try {
    const result = await models.sequelize.transaction(async (t) => {

      const tarea = await models.Pre_Tarea_Esparrago.create({
        fecha: req.body.fecha,
        horainicio: req.body.horainicio,
        horafin: req.body.horafin,
        pausainicio: req.body.pausainicio,
        pausafin: req.body.pausafin,
        linea: 1,
        idcentrocosto: req.body.idcentrocosto,
        idlabor: req.body.idlabor,
        idactividad: req.body.idactividad,
        codigosupervisor: req.body.codigosupervisor,
        codigodigitador: req.body.codigodigitador,
        fechamod: Date.now(),
        /* activo: true, */
        idtipotarea: req.body.idtipotarea,
        idusuario: req.body.idusuario,
        idestado: 1,
        turnotareo: req.body.turnotareo,
        diasiguiente: req.body.diasiguiente,

        accion: 'I',
        usuario: 0,
        ip: req.ip,
        accion_usuario: 'Creo un nuevo pre tareo completo.',
      }, { transaction: t });

      if (req.body.Pre_Tarea_Esparrago_Formato) {
        for (let i = 0; i < req.body.Pre_Tarea_Esparrago_Formato.length; i++) {
          req.body.Pre_Tarea_Esparrago_Formato[i].itempretareaesparrago = tarea.itempretareaesparrago;
          req.body.Pre_Tarea_Esparrago_Formato[i].hora = req.body.fecha;
          req.body.Pre_Tarea_Esparrago_Formato[i].fechamod = Date.now();
          req.body.Pre_Tarea_Esparrago_Formato[i].idestado = 1;

          const formato= await models.Pre_Tarea_Esparrago_Formato.create(req.body.Pre_Tarea_Esparrago_Formato[i], {transaction: t});
          
          for (let j = 0; j < req.body.Pre_Tarea_Esparrago_Formato[i].Pre_Tarea_Esparrago_Detalle.length; j++) {
            /* const element = req.body.Pre_Tarea_Esparrago_Formato[i].Pre_Tarea_Esparrago_Detalle[j];
            element.itemprestareaesparragoformato=formato.itemprestareaesparragoformato;
            await models.Pre_Tarea_Esparrago_Detalle.create(element, {transaction: t}); */
            req.body.Pre_Tarea_Esparrago_Formato[i].Pre_Tarea_Esparrago_Detalle[j].itemprestareaesparragoformato=formato.itemprestareaesparragoformato;
          }
          await models.Pre_Tarea_Esparrago_Detalle.bulkCreate(req.body.Pre_Tarea_Esparrago_Formato[i].Pre_Tarea_Esparrago_Detalle, {transaction: t});
        }
        //await models.Pre_Tarea_Esparrago_Formato.bulkCreate(req.body.Pre_Tarea_Esparrago_Formato, { transaction: t });
      }
      return tarea;
    });
    res.status(200).json(result)
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Error en el servidor ${error}` })
  }
}

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getPreTareoEsparragos,
  getPreTareoEsparrago,
  createPreTareoEsparrago,
  updatePreTareoEsparrago,
  deletePreTareoEsparrago,
  uploadFilePreTareaEsparrago,
  createAllPreTareaEsparrago,
}