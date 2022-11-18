'use strict'
const models = require('../models')
const request = require('../services/request')
const rutas = require('../services/rutas')

async function getPersonalTareaProcesos(req, res) {
  let [err, personalTareaProcesos] = await get(models.PersonalTareaProceso.findAll({
    /* where:{estado: 'A'}, */
    /* include: [{all: true}] */
  }))
  if (err) return res.status(500).json({ message: `err` })
  if (personalTareaProcesos == null) return res.status(404).json({ message: `PersonalTareaProcesos nulos` })
  res.status(200).json(personalTareaProcesos)
}

async function getPersonalTareaProceso(req, res) {
  let [err, personalTareaProceso] = await get(models.PersonalTareaProceso.findOne({
    where: { id: req.params.id, estado: 'A' },
    include: [{ all: true }]
  }))
  console.log(err)
  if (err) return res.status(500).json({ message: `err` })
  if (personalTareaProceso == null) return res.status(404).json({ message: `PersonalTareaProcesos nulos` })
  res.status(200).json(personalTareaProceso)
}

async function personalTareaProcesoByRango(req, res) {
  console.log(req.body);
  let dInicio = new Date(req.body.inicio).setHours(0, 0, 0);
  let dFin = new Date(req.body.fin).setHours(23, 59, 59);
  let mantenedor=req.body.mantenedor;
  let tipo= req.body.tipo;

  let whereActividad={};

  switch (mantenedor) {
    case 1:
      whereActividad={esjornal: 1};
      break;
    case 2:
      whereActividad={esrendimiento: 1};
      break;
    case 3:
      whereActividad={esjornal: 1};
      break;
    case 4:
      whereActividad={esrendimiento: 1};
      break;
    default:
      break;
  }


  let [err, personalTareaProceso] = await get(models.PersonalTareaProceso.findAll({
    where: {
      estadosap: (tipo==3) ? null : (tipo==2) ? 'E' : 'T',
      [models.Sequelize.Op.and]: 
        [
          { fechamod: { [models.Sequelize.Op.gt]: dInicio } },
          { fechamod: { [models.Sequelize.Op.lte]: dFin } } 
        ]
    },
    include: [
      {model: models.Personal_Empresa },
      {model: models.TareaProceso,
        include: [{model: models.Centro_Costo}, { model: models.Actividad,}, {model: models.Labor}] }
    ]
  }))

  console.log(err);

  if (err) return res.status(500).json({ message: `${err}` })
  if (personalTareaProceso == null) return res.status(404).json({ message: `PersonalTareaProcesos nulos` })
  res.status(200).json(personalTareaProceso)
}

async function createPersonalTareaProceso(req, res) {
  let [err, personalTareaProceso] = await get(models.PersonalTareaProceso.create({
    //all fields to insert

    accion: 'I',
    accion_usuario: 'Creo un nuevo personalTareaProceso.',
    ip: req.ip,
    usuario: 0
  }))
  if (err) return res.status(500).json({ message: `err` })
  if (personalTareaProceso == null) return res.status(404).json({ message: `PersonalTareaProcesos nulos` })
  res.status(200).json(personalTareaProceso)
}


async function updatePersonalTareaProceso(req, res) {
  let [err, personalTareaProceso] = await get(models.PersonalTareaProceso.update({
    //all fields to update

    accion: 'U',
    accion_usuario: 'Edito un personalTareaProceso.',
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
  if (personalTareaProceso == null) return res.status(404).json({ message: `PersonalTareaProcesos nulos` })
  res.status(200).json(personalTareaProceso[1][0].dataValues)
}


async function deletePersonalTareaProceso(req, res) {
  let [err, personalTareaProceso] = await get(models.PersonalTareaProceso.update({
    estado: 'I',

    accion_usuario: 'Elimino un personalTareaProceso.',
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
  if (personalTareaProceso == null) return res.status(404).json({ message: `PersonalTareaProcesos nulos` })
  res.status(200).json(personalTareaProceso[1][0].dataValues)
}

async function migrarContenido(req, res) {

  let headersODATA = {
    'x-csrf-token': 'fetch',
    'Host': 'ecs-hanaqas.agrovision.com:44300',
    'Authorization': 'Basic bnNvc2E6TmVzdG9yLjIwMjI=',
    'Cookie': 'sap-XSRF_AVQ_200=U0ubRSFepSItc8C9jQLEsQ%3d%3d20221010063437SXMBwXw3m1v0ccoODUGUKy4P9ApG0-CXPMX0sQsObGc%3d; sap-usercontext=sap-client=200',
  }
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

  try {
    let resultODATA = await request.get(rutas.getToken, headersODATA)
    if (resultODATA.response.statusCode >= 200 && resultODATA.response.statusCode <= 299) {
      console.log('Éxito al consultar el TOKEN.');
      console.log(resultODATA.response.headers['x-csrf-token']);
      headersODATA['x-csrf-token'] = resultODATA.response.headers['x-csrf-token'];
      headersODATA['cookie'] = resultODATA.response.headers['set-cookie'];

      let elementos = req.body
      console.log(elementos.length);
      let contenido = [];
      let datos={};

      for (let i = 0; i < elementos.length; i++) {
        const element = elementos[i];
          datos.ID=element.item;
          datos.mantenedor_destino ="CAMPO_DESTAJO",
          //sacar de MantenedorTareo -> codigosap
          datos.CODIGO_TRABAJADOR = element.codigoempresa ?? "",
          //dni del trabajador
          datos.DNI = element.Personal_Empresa.nrodocumento ?? "46497016",
          datos.FECHA_TAREO = request.returnFormatDate(element.fechamod),
          //siempre G01 fijo
          datos.GRUPO = "G01",
          //supervisor de la tarea
          datos.CODIGO_SUPERVISOR = element.TareaProceso?.codigoempresasupervisor ?? "",
          datos.NAVE = element.NAVE ?? "",
          datos.LINEA_PROCESO = element.LINEA_PROCESO ?? "1",
          datos.FUNDO = element.TareaProceso?.Centro_Costo?.zfundo ?? "",
          datos.ETAPA = element.TareaProceso?.Centro_Costo?.zetapa ?? "",
          datos.CAMPO = element.TareaProceso?.Centro_Costo?.zcampo ?? "",
          datos.TURNO_CAMPO = element.TareaProceso?.Centro_Costo?.zturno ?? "",
          datos.CULTIVO = element.TareaProceso?.Centro_Costo?.zcultivo ?? "",
          datos.VARIEDAD = element.TareaProceso?.Centro_Costo?.zvaried ?? "",
          datos.CECO = element.TareaProceso?.Centro_Costo?.codigoempresa ?? "",
          datos.ACTIVIDAD = element.TareaProceso?.Actividad?.actividad ?? "",
          datos.LABOR = element.TareaProceso?.Labor?.labor ?? "",
          datos.TURNO_LABOR = element.TURNO_LABOR ?? "",
          datos.HORA_INICIO = request.returnOnlyHours(element.horainicio) ?? "",
          datos.HORA_FIN = request.returnOnlyHours(element.horafin) ?? "",
          datos.INICIO_PAUSA = request.returnOnlyHours(element.pausainicio) ?? "",
          datos.FIN_PAUSA = request.returnOnlyHours(element.pausafin) ?? "",
          //campo calculador por la aplicación
          datos.HORA_TRABAJADA = element.HORA_TRABAJADA ?? "",
          datos.DIA_SIG = element.diasiguiente ? 1 : 0,
          //vacio
          datos.CODIGO_BONO = element.CODIGO_BONO ?? "",
          //siempre 0
          datos.HORA_COMPENSAR = element.HORA_COMPENSAR ?? ".00",
          datos.CODIGO_PRESENTACION = element.TareaProceso?.Labor.codigopresenta ?? "RAC.",
          //campo: cantidadrendimiento
          datos.CANTIDAD = element.cantidadrendimiento ?? "0.00",
          datos.UNIDAD_MEDIDA = element.UNIDAD_MEDID ?? "",
          //fechamod
          //datos.fecha = "2022-11-15",
          datos.fecha = request.returnFormatDate(element.TareaProceso?.fecha),
          //fecha en que el frontend lo envia.
          //datos.fechagmo = "2022-10-04 07:27:06",
          datos.fechagmo = new Date(),
          contenido.push(datos);
          console.log(request.returnFormatDate(element.TareaProceso?.fecha));
          datos={}
      }
      //console.log(contenido);

      let resultSBS = await request.post(rutas.rutaODATA, contenido, headersODATA);
      if (resultSBS.response.statusCode >= 200 && resultSBS.response.statusCode <= 299) {
        console.log("exito al enviar")
        console.log(resultSBS.response.body)
        let retorno=[];
        let respuestas= JSON.parse(resultSBS.response.body);

        for (let i = 0; i < respuestas.length; i++) {
          const element = respuestas[i];
          let [err, personalTareaProceso] = await get(models.PersonalTareaProceso.update({
            Mensajesap: element.MENSAJE,
            estadosap: element.ESTADO,
        
            accion: 'U',
            accion_usuario: 'Se registro la migración.',
            ip: req.ip,
            usuario: 0
          }, {
            where: {
              item: parseInt(element.ID), [models.Sequelize.Op.or]: [
                { estadosap: null },
                { estadosap: 'E' },
                /* { estadosap: 'T' } */
              ]
            },
            individualHooks: true,
            validate: false
          }))
          if (err) return res.status(500).json({ message: `err` })
          if (personalTareaProceso == null) return res.status(404).json({ message: `PersonalTareaProcesos nulos` })
          retorno.push(personalTareaProceso[1][0]?.dataValues ?? req.body[i])
        }

        res.status(200).json(retorno)

      } else {
        console.log(resultSBS.response.body);
      }
    }
  } catch (error) {
    console.log('Error try: ' + error);
  }
}


function get(promise) {
  return promise.then(data => {
    return [null, data];
  })
    .catch(err => [err]);
}

module.exports = {
  getPersonalTareaProcesos,
  getPersonalTareaProceso,
  createPersonalTareaProceso,
  updatePersonalTareaProceso,
  deletePersonalTareaProceso,
  personalTareaProcesoByRango,
  migrarContenido,
}