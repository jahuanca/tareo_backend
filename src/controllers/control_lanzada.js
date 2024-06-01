const { get } = require('../services/utils')
const logger = require('../config/logger')
const models = require('../models')
const { transform } = require('dottie')
const ErrorServer = require('../services/error/models/ErrorServer')
const ErrorNotFound = require('../services/error/models/ErrorNotFound')

const getResumenLanzada = async (req, res) => {
  const query = req.query
  query.estado = 'A'
  let [err, resumens] = await get(
    models.sequelize.query(
      queryResumen(req.query.itempretareaesparragovarios)
    )
  )
  if (err) {
    logger.error(`500 GET getResumenLanzada, ${err}.`)
    return res.status(500).json({ message: `${err}` })
  }
  resumens = transform(resumens[0])
  if (resumens == null) {
    logger.error('404 GET getResumenLanzada, valores nulos.')
    return res.status(404).json({ message: 'Pesados nulos' })
  }
  logger.info(`200 GET getResumenLanzada, ${resumens.length} items.`)
  res.status(200).json(resumens)
}

const getReportePesadoLineaMesa = async (req, res) => {
  const query = req.query
  query.estado = 'A'
  const [err, header] = await get(
    models.sequelize.query(
      queryReporteLineaMesaHeader(
        query.itempretareaesparragovarios,
        query.fecha,
        query.turno,
        query.linea,
        query.grupo
      )
    )
  )
  if (err) {
    logger.error(`500 GET getReporteLineaMesa header, ${err}.`)
    return res.status(500).json({ message: `${err}` })
  }

  if (header == null) {
    logger.error('404 GET getReporteLineaMesa header, valores nulos.')
    return res.status(404).json({ message: 'Pesados nulos' })
  }

  const [errLabors, labors] = await get(
    models.sequelize.query(
      queryReporteLineaMesaLabors(
        query.itempretareaesparragovarios,
        query.linea,
        query.mesa
      )
    )
  )
  if (errLabors) {
    logger.error(`500 GET getReporteLineaMesa labors, ${err}.`)
    return res.status(500).json({ message: `${err}` })
  }

  if (labors == null) {
    logger.error('404 GET getReporteLineaMesa labors, valores nulos.')
    return res.status(404).json({ message: 'labors nulos' })
  }
  // logger.info(`200 GET getReporteLineaMesa, ${reporte.itempretareaesparragovarios} itempretareaesparragovarios.`)
  res.status(200).json({
    header: header[0][0],
    labors: labors[0]
  })
}

const asyncCatch = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(new ErrorServer(err)))
}

const getResumenLanzadaError = asyncCatch(async (req, res) => {
  const query = req.query
  query.estado = 'A'
  let [err, resumens] = await getError(
    models.sequelize.query(
      queryResumen(req.query.itempretareaesparragovarios)
    )
  )
  if (err) {
    err.message = `GET - getResumenLanzadaError : ${err.message}`
    throw err
  }
  resumens = transform(resumens[0])
  if (resumens == null) {
    logger.error('404 GET getResumenLanzada, valores nulos.')
    return res.status(404).json({ message: 'Pesados nulos' })
  }
  logger.info(`200 GET getResumenLanzada, ${resumens.length} items.`)
  res.status(200).json(resumens)
})

const getError = (promise) => {
  return promise.then(data => {
    if (data == null) {
      return [new ErrorNotFound('valores nulos')]
    }
    return [null, data]
  })
    .catch(err => {
      return [
        new ErrorServer(err)
      ]
    })
}

const createPesado = asyncCatch(async (req, res) => {
  const [err, pesado] = await getError(models.PreTareaEsparragoVarios.create({
    fecha: req.body.fecha,
    fechamod: req.body.fechamod,
    hora: req.body.hora,
    horainicio: req.body.horainicio,
    horafin: req.body.horafin,
    pausainicio: req.body.pausainicio,
    pausafin: req.body.pausafin,
    idestado: req.body.idestado,
    idusuario: req.body.idusuario,
    idcentrocosto: req.body.idcentrocosto,
    idtipotarea: req.body.idtipotarea,
    diasiguiente: req.body.diasiguiente,
    codigosupervisor: req.body.codigosupervisor,
    codigodigitador: req.body.codigodigitador,
    turnotareo: req.body.turnotareo,
    linea: req.body.linea,
    estado: 'A'
  }))
  if (err) {
    err.message = `POST - createPesado : ${err.message}`
    throw err
  }
  logger.info(`200 POST createPesado, ${pesado.itempretareaesparragovarios} items.`)
  res.status(200).json(pesado)
})

module.exports = {
  getResumenLanzada,
  getResumenLanzadaError,
  createPesado,
  getReportePesadoLineaMesa
}

const queryResumen = (itempretareaesparragovarios) => `
    SELECT linea, mesa, count(*) as sizeDetails  FROM PersonalPreTareaEsparrago  
    WHERE itempretareaesparragovarios = ${itempretareaesparragovarios}
    GROUP BY linea, mesa
    ORDER BY linea, mesa;
`

const queryReporteLineaMesaHeader = (itempretareaesparragovarios, fecha, turno, linea, grupo) => `
SELECT * 
, (SELECT COUNT(*) FROM EsparragoAgrupaPersonalDetalle 
where EsparragoAgrupaPersonalDetalle.itemagruparpersonal = EsparragoAgrupaPersonal.itemagruparpersonal
) as sizePersonalMesa
 , (SELECT COUNT(*) FROM PersonalPreTareaEsparrago
where PersonalPreTareaEsparrago.linea = EsparragoAgrupaPersonal.linea AND PersonalPreTareaEsparrago.mesa = EsparragoAgrupaPersonal.grupo
AND itempretareaesparragovarios = ${itempretareaesparragovarios}
) as sizeDetails
FROM EsparragoAgrupaPersonal
WHERE fecha = '${fecha}'
AND turno = '${turno}'
AND linea = ${linea}
AND grupo = ${grupo}
`
const queryReporteLineaMesaLabors = (itempretareaesparragovarios, linea, mesa) => `
SELECT  p.idlabor , l.labor, l.descripcion  , count(*) as sizeDetails 
FROM PersonalPreTareaEsparrago p
INNER JOIN Labores l 
ON p.idlabor = l.idlabor 
WHERE itempretareaesparragovarios = ${itempretareaesparragovarios}
AND linea = ${linea}
AND mesa = ${mesa}
GROUP BY p.idlabor, l.labor, l.descripcion 
`
