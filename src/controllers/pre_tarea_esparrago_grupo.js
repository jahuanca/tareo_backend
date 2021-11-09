
'use strict'
const models=require('../models')

async function getPreTareaEsparragoGrupos(req,res){
  let [err,pre_tarea_esparrago_grupos]=await get(models.PreTareaEsparragoGrupo.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(pre_tarea_esparrago_grupos==null) return res.status(404).json({message: `PreTareaEsparragoGrupos nulos`})
  res.status(200).json(pre_tarea_esparrago_grupos)
}

async function getPreTareaEsparragoGrupo(req,res){
  let [err,pre_tarea_esparrago_grupo]=await get(models.PreTareaEsparragoGrupo.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `${err}`})
  if(pre_tarea_esparrago_grupo==null) return res.status(404).json({message: `PreTareaEsparragoGrupos nulos`})
  res.status(200).json(pre_tarea_esparrago_grupo)
}

async function createPreTareaEsparragoGrupo(req,res){
  let [err,pre_tarea_esparrago_grupo]=await get(models.PreTareaEsparragoGrupo.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo pre_tarea_esparrago_grupo.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(pre_tarea_esparrago_grupo==null) return res.status(404).json({message: `PreTareaEsparragoGrupos nulos`})
  res.status(200).json(pre_tarea_esparrago_grupo)
}


async function updatePreTareaEsparragoGrupo(req,res){
  let [err,pre_tarea_esparrago_grupo]=await get(models.PreTareaEsparragoGrupo.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un pre_tarea_esparrago_grupo.',
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
  if(pre_tarea_esparrago_grupo==null) return res.status(404).json({message: `PreTareaEsparragoGrupos nulos`})
  res.status(200).json(pre_tarea_esparrago_grupo[1][0].dataValues)
}


async function deletePreTareaEsparragoGrupo(req,res){
  let [err,pre_tarea_esparrago_grupo]=await get(models.PreTareaEsparragoGrupo.update({
    estado: 'I',

    accion_usuario: 'Elimino un pre_tarea_esparrago_grupo.',
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
  if(pre_tarea_esparrago_grupo==null) return res.status(404).json({message: `PreTareaEsparragoGrupos nulos`})
  res.status(200).json(pre_tarea_esparrago_grupo[1][0].dataValues)
}

async function uploadFilePreTareaEsparragoGrupo(req, res) {

  /* console.log(req.body); */

  let [err, pretareoProcesoUva] = await get(models.Pre_Tarea_Esparrago_Grupo.update({
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

async function createAllPreTareaEsparragoGrupo(req, res) {
  try {
    /* console.log(req.body) */
    const result = await models.sequelize.transaction(async (t) => {

      const tarea = await models.Pre_Tarea_Esparrago_Grupo.create({
        fecha: new Date(req.body.fecha),
        horainicio: new Date(req.body.horainicio),
        horafin: new Date(req.body.horafin),
        pausainicio: new Date(req.body.pausainicio),
        pausafin: new Date(req.body.pausafin),
        linea: 1,
        idcentrocosto: req.body.idcentrocosto,
        kilosavance: req.body.kilosavance,
        idlabor: req.body.idlabor,
        idactividad: req.body.idactividad,
        codigosupervisor: req.body.codigosupervisor,
        codigodigitador: req.body.codigodigitador,
        fechamod: new Date(req.body.fechamod),
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

      if (req.body.Pre_Tarea_Esparrago_Detalle_Grupo) {
        for (let i = 0; i < req.body.Pre_Tarea_Esparrago_Detalle_Grupo.length; i++) {
          req.body.Pre_Tarea_Esparrago_Detalle_Grupo[i].itemprestareaesparragogrupo = tarea.itempretareaesparragogrupo;
          req.body.Pre_Tarea_Esparrago_Detalle_Grupo[i].fechamod = Date.now();
          req.body.Pre_Tarea_Esparrago_Detalle_Grupo[i].idestado = 1;
        }
        await models.Pre_Tarea_Esparrago_Detalle_Grupo.bulkCreate(req.body.Pre_Tarea_Esparrago_Detalle_Grupo, { transaction: t });
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
  getPreTareaEsparragoGrupos,
  getPreTareaEsparragoGrupo,
  createPreTareaEsparragoGrupo,
  updatePreTareaEsparragoGrupo,
  deletePreTareaEsparragoGrupo,
  uploadFilePreTareaEsparragoGrupo,
  createAllPreTareaEsparragoGrupo,
}