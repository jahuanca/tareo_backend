'use strict'
const models = require('../models')

async function getPre_Tareo_Procesos(req, res) {
  let [err, pre_tareo_procesos] = await get(models.Pre_Tareo_Proceso.findAll({
    /* where:{estado: 'A'}, */
    /* order: [['fechamod','DESC']], */
    include: [
      { model: models.Centro_Costo },
      { model: models.Labores_Cultivo_Packing, include: [{ all: true }] }
    ]
  }))
  if (err) return res.status(500).json({ message: `${err}` })
  if (pre_tareo_procesos == null) return res.status(404).json({ message: `Pre_Tareo_Procesos nulos` })
  res.status(200).json(pre_tareo_procesos)
}

async function getPre_Tareo_Proceso(req, res) {
  let [err, pre_tareo_proceso] = await get(models.Pre_Tareo_Proceso.findOne({
    where: { id: req.params.id, estado: 'A' },
    include: [{ all: true }]
  }))
  console.log(err)
  if (err) return res.status(500).json({ message: `err` })
  if (pre_tareo_proceso == null) return res.status(404).json({ message: `Pre_Tareo_Procesos nulos` })
  res.status(200).json(pre_tareo_proceso)
}

async function createPre_Tareo_Proceso(req, res) {
  let [err, pre_tareo_proceso] = await get(models.Pre_Tareo_Proceso.create({
    //all fields to insert

    accion: 'I',
    accion_usuario: 'Creo un nuevo pre_tareo_proceso.',
    ip: req.ip,
    usuario: 0
  }))
  if (err) return res.status(500).json({ message: `err` })
  if (pre_tareo_proceso == null) return res.status(404).json({ message: `Pre_Tareo_Procesos nulos` })
  res.status(200).json(pre_tareo_proceso)
}

async function createAllPreTareoProceso(req, res) {
  try {
    const result = await models.sequelize.transaction(async (t) => {
      if (req.body.itempretareaproceso == null) {
        const tarea = await models.Pre_Tareo_Proceso.create({
          /* itempretareaproceso: parseInt(new Date().getTime() / 10000000, 10) , */
          fecha: new Date(req.body.fecha),
          horainicio: new Date(req.body.horainicio),
          horafin: new Date(req.body.horafin),
          pausainicio: new Date(req.body.pausainicio),
          pausafin: new Date(req.body.pausafin),
          /* linea: new Date(req.body.linea),
          item: new Date(req.body.item), */
          linea: 1,
          item: 3,
          idcentrocosto: req.body.idcentrocosto,
          codigoempresasupervisor: req.body.codigoempresasupervisor,
          codigoempresadigitador: req.body.codigoempresadigitador,
          fechamod: new Date(req.body.fechamod),
          activo: true,
          idusuario: req.body.idusuario,
          /* idestado: 1,*/
          turnotareo: req.body.turnotareo,          
          diasiguiente: req.body.diasiguiente,

          accion: 'I',
          usuario: 0,
          ip: req.ip,
          accion_usuario: 'Creo un nuevo pre tareo completo.',
        }, { transaction: t });

        if (req.body.Pre_Tareo_Proceso_Detalles) {
          for (let i = 0; i < req.body.Pre_Tareo_Proceso_Detalles.length; i++) {
            req.body.Pre_Tareo_Proceso_Detalles[i].itempretareaproceso = tarea.itempretareaproceso;
            req.body.Pre_Tareo_Proceso_Detalles[i].fechamod = Date.now();
            //req.body.Pre_Tareo_Proceso_Detalles[i].transferidosap = true;
            req.body.Pre_Tareo_Proceso_Detalles[i].idestado = 1;
          }
          await models.Pre_Tareo_Proceso_Detalle.bulkCreate(req.body.Pre_Tareo_Proceso_Detalles, { transaction: t });
        }
        /* trabajador.dataValues.usuario=user; */
        return tarea;
      } else {
        const result = await models.sequelize.transaction(async (t) => {

          if (req.body.Pre_Tareo_Proceso_Detalles) {
            await models.Pre_Tareo_Proceso_Detalle.bulkCreate(req.body.Pre_Tareo_Proceso_Detalles, { transaction: t });
          }
          return req.body;
        });
      }
    });

    res.status(200).json(result)
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Error en el servidor ${error}` })
  }
}


async function updatePre_Tareo_Proceso(req, res) {
  let [err, pre_tareo_proceso] = await get(models.Pre_Tareo_Proceso.update({
    //all fields to update

    accion: 'U',
    accion_usuario: 'Edito un pre_tareo_proceso.',
    ip: req.ip,
    usuario: 0
  }, {
    where: {
      id: req.body.id, estado: 'A'
    },
    individualHooks: true,
    validate: false
  }))
  if (err) return res.status(500).json({ message: `err` })
  if (pre_tareo_proceso == null) return res.status(404).json({ message: `Pre_Tareo_Procesos nulos` })
  res.status(200).json(pre_tareo_proceso[1][0].dataValues)
}


async function deletePre_Tareo_Proceso(req, res) {
  let [err, pre_tareo_proceso] = await get(models.Pre_Tareo_Proceso.update({
    estado: 'I',

    accion_usuario: 'Elimino un pre_tareo_proceso.',
    accion: 'D',
    ip: req.ip,
    usuario: 0
  }, {
    where: {
      id: req.params.id, estado: 'A'
    },
    individualHooks: true
  }))
  if (err) return res.status(500).json({ message: `err` })
  if (pre_tareo_proceso == null) return res.status(404).json({ message: `Pre_Tareo_Procesos nulos` })
  res.status(200).json(pre_tareo_proceso[1][0].dataValues)
}

async function uploadFilePreTareoProceso(req, res) {

  let [err, pretareoProceso] = await get(models.Pre_Tareo_Proceso.update({
    firmasupervisor: req.file.filename,

    accion: 'U',
    accion_usuario: 'Edito un preTareoProceso.',
    ip: req.ip,
    usuario: 0
  }, {
    where: {
      itempretareaproceso: req.body.itempretareaproceso
    },
    individualHooks: true,
    validate: false
  }))
  if (err) return res.status(500).json({ message: `${err}` })
  if (pretareoProceso == null) return res.status(404).json({ message: `Pretareos nulos` })
  res.status(200).json(pretareoProceso[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
    return [null, data];
  })
    .catch(err => [err]);
}

module.exports = {
  getPre_Tareo_Procesos,
  getPre_Tareo_Proceso,
  createPre_Tareo_Proceso,
  createAllPreTareoProceso,
  updatePre_Tareo_Proceso,
  deletePre_Tareo_Proceso,
  uploadFilePreTareoProceso,
}