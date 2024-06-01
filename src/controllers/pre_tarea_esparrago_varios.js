
'use strict'
const models=require('../models')

async function getPreTareaEsparragoVarioss(req,res){
  let [err,pre_tarea_esparrago_varios]=await get(models.Pre_Tarea_Esparrago_Varios.findAll({
    /* where:{estado: 'A'},
    include: [{all: true}] */
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(pre_tarea_esparrago_varios==null) return res.status(404).json({message: `PreTareaEsparragoVarioss nulos`})
  res.status(200).json(pre_tarea_esparrago_varios)
}

async function getPreTareaEsparragoVarios(req,res){
  let [err,pre_tarea_esparrago_vario]=await get(models.PreTareaEsparragoVarios.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `${err}`})
  if(pre_tarea_esparrago_vario==null) return res.status(404).json({message: `PreTareaEsparragoVarioss nulos`})
  res.status(200).json(pre_tarea_esparrago_vario)
}

async function createPreTareaEsparragoVarios(req,res){
  let [err,pre_tarea_esparrago_vario]=await get(models.PreTareaEsparragoVarios.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo pre_tarea_esparrago_vario.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(pre_tarea_esparrago_vario==null) return res.status(404).json({message: `PreTareaEsparragoVarioss nulos`})
  res.status(200).json(pre_tarea_esparrago_vario)
}


async function updatePreTareaEsparragoVarios(req,res){
  let [err,pre_tarea_esparrago_vario]=await get(models.PreTareaEsparragoVarios.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un pre_tarea_esparrago_vario.',
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
  if(pre_tarea_esparrago_vario==null) return res.status(404).json({message: `PreTareaEsparragoVarioss nulos`})
  res.status(200).json(pre_tarea_esparrago_vario[1][0].dataValues)
}


async function deletePreTareaEsparragoVarios(req,res){
  let [err,pre_tarea_esparrago_vario]=await get(models.PreTareaEsparragoVarios.update({
    estado: 'I',

    accion_usuario: 'Elimino un pre_tarea_esparrago_vario.',
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
  if(pre_tarea_esparrago_vario==null) return res.status(404).json({message: `PreTareaEsparragoVarioss nulos`})
  res.status(200).json(pre_tarea_esparrago_vario[1][0].dataValues)
}

async function uploadFilePreTareaEsparragoVarios(req, res) {

  let [err, pretareoProcesoUva] = await get(models.Pre_Tarea_Esparrago_Varios.update({
    firmasupervisor: req.file.filename,

    accion: 'U',
    accion_usuario: 'Edito un preTareaEsparragoGrupo.',
    ip: req.ip,
    usuario: 0
  }, {
    where: {
      itempretareaesparragogrupo: req.body.itempretareaesparragogrupo
    },
    individualHooks: true,
    validate: false
  }))
  /* console.log(err); */
  if (err) return res.status(500).json({ message: `${err}` })
  if (pretareoProcesoUva == null) return res.status(404).json({ message: `Pretareos nulos` })
  res.status(200).json(pretareoProcesoUva[1][0].dataValues)
}

async function createAllPreTareaEsparragoVarios(req, res) {
  try {
    /* console.log(req.body.Personal_Pre_Tarea_Esparrago);
    return res.status(500).json({ message: `Error en el servidor prueba` }) */
    const result = await models.sequelize.transaction(async (t) => {

      const tarea = await models.Pre_Tarea_Esparrago_Varios.create({
        fecha: req.body.fecha,
        hora: req.body.fecha,
        horainicio: req.body.horainicio,
        horafin: req.body.horafin,
        pausainicio: req.body.pausainicio,
        pausafin: req.body.pausafin,
        linea: 1,
        idcentrocosto: req.body.idcentrocosto,
        idlabor: req.body.idlabor,
        idtipotarea: req.body.idtipotarea,
        codigosupervisor: req.body.codigosupervisor,
        codigodigitador: req.body.codigodigitador,
        fechamod: req.body.fechamod,
        /* activo: true, */
        idusuario: req.body.idusuario,
        idestado: 1,
        turnotareo: req.body.turnotareo,
        diasiguiente: req.body.diasiguiente,

        accion: 'I',
        usuario: 0,
        ip: req.ip,
        accion_usuario: 'Creo un nuevo pre tareo completo.',
      }, { transaction: t });

      /* if (req.body.Pre_Tarea_Esparrago_Detalle_Varios) {
        for (let i = 0; i < req.body.Pre_Tarea_Esparrago_Detalle_Varios.length; i++) {
          req.body.Pre_Tarea_Esparrago_Detalle_Varios[i].itempretareaesparragovarios = tarea.itempretareaesparragovarios;
          req.body.Pre_Tarea_Esparrago_Detalle_Varios[i].fechamod = Date.now();
          req.body.Pre_Tarea_Esparrago_Detalle_Varios[i].idestado = 1;
        }
        await models.Pre_Tarea_Esparrago_Detalle_Varios.bulkCreate(req.body.Pre_Tarea_Esparrago_Detalle_Varios, { transaction: t });
      } */
      if (req.body.Personal_Pre_Tarea_Esparrago) {
        for (let i = 0; i < req.body.Personal_Pre_Tarea_Esparrago.length; i++) {
          req.body.Personal_Pre_Tarea_Esparrago[i].itempretareaesparragovarios = tarea.itempretareaesparragovarios;
          req.body.Personal_Pre_Tarea_Esparrago[i].fechamod = Date.now();
          req.body.Personal_Pre_Tarea_Esparrago[i].idestado = 1;
        }
        await models.Personal_Pre_Tarea_Esparrago.bulkCreate(req.body.Personal_Pre_Tarea_Esparrago, { transaction: t });
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
  getPreTareaEsparragoVarioss,
  getPreTareaEsparragoVarios,
  createPreTareaEsparragoVarios,
  updatePreTareaEsparragoVarios,
  deletePreTareaEsparragoVarios,
  uploadFilePreTareaEsparragoVarios,
  createAllPreTareaEsparragoVarios,
}