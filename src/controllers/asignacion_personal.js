'use strict'
const models = require('../models')
const logger = require('../config/logger')
const { transform } = require('dottie')

async function getLineasMesas(req, res) {
    let query = req.query;
    let whereString = '';
    let subQuery=''
    console.log(query)
    if (query.fecha) whereString += `WHERE fecha = '${query.fecha}' `
    if (query.turno) whereString += ` AND turno = '${query.turno}' `
    if (query.linea){
        whereString += ` AND linea = ${query.linea} `
        subQuery= selectSubQuery
    }
    console.log(subQuery)
    console.log(whereString)
    const [err, detalles] = await get(models.sequelize.query(
        getQuery(whereString, subQuery)))
    if (err) {
        logger.error(`500 GET getLineasMesas, ${err}.`)
        return res.status(500).json({ message: `${err}` })
    }
    if (detalles == null) {
        logger.error(`404 GET getLineasMesas, detalles nulos.`)
        return res.status(404).json({ message: `detalles nulos` })
    }
    logger.info(`200 GET getLineasMesas, ${detalles.length} values.`)
    res.status(200).json(transform(detalles[0]))
}

async function getDetalles(req, res) {
    let query = [];
    query.push(req.query)
    query.push({estado: 'A'})
    console.log(query)
    let [err, detalles] = await get(models.EsparragoAgrupaPersonalDetalle.findAll({
        where: {
            [models.Sequelize.Op.and]: query
        },
        include: [{ model: models.Personal_Empresa, as: 'personal' }]
    }))
    if (err) {
        logger.error(`500 GET getDetalles, ${err}.`)
        return res.status(500).json({ message: `${err}` })
    }
    if (detalles == null) {
        logger.error(`404 GET getDetalles, detalles nulos.`)
        return res.status(404).json({ message: `detalles nulos` })
    }
    logger.info(`200 GET getDetalles, ${detalles.length} values.`)
    res.status(200).json(detalles)
}

async function createDetalle(req, res) {
    let [errE, existe] = await get(models.EsparragoAgrupaPersonalDetalle.findOne({
        where: {
            codigoempresa: req.body.codigoempresa,
            turno: req.body.turno,
            fecha: req.body.fecha,
            linea: req.body.linea,
            grupo: req.body.grupo,
            estado: 'A'
        }
    }))
    if(errE){
        logger.error(`500 POST createDetalle, ${errE}`)
        return res.status(500).json({ message: `${errE}` })
    }
    if (existe != null) {
        logger.error(`500 POST createDetalle, Esta persona ya ha sido registrada en este grupo.`)
        return res.status(500).json({ message: `Esta persona ya ha sido registrada en este grupo.` })
    }
    let [errA, asistencia] = await get(models.AsistenciaRegistroPersonal.findOne({
        where: {
            fechaturno: req.query.fechaturno,
            idturno: req.query.idturno,
            codigoempresa: req.query.codigoempresa,
            /*fechaturno: req.body.fechaturno== 'D' ? 1 : 2,
            idturno: (req.body.idturno== 'D' ? 1 : 2),
            codigoempresa: req.query.codigoempresa,*/
            estado: 'A',
        },
        include: [
            {model: models.Personal_Empresa,  as: 'personal'}
        ]
    }));

    if (errA) return res.status(500).json({ message: `Error: ${errA}` })
    if (asistencia == null) return res.status(404).json({ message: `Esta persona no se encuentra en la lista de asistencia.` })

    let [err, detalle] = await get(models.EsparragoAgrupaPersonalDetalle.create({
        itemagruparpersonaldetalle: req.body.itemagruparpersonaldetalle,
        itemagruparpersonal: req.body.itemagruparpersonal,
        codigoempresa: req.body.codigoempresa,
        fechamod: req.body.fechamod,
        idusuario: req.body.idusuario,
        linea: req.body.linea,
        grupo: req.body.grupo,
        turno: req.body.turno,
        fecha: req.body.fecha,
        idestado: req.body.idestado,
        documento: req.body.documento,
        estado: 'A'
    }))
    if (err) {
        logger.error(`500 POST createDetalle, ${err}.`)
        return res.status(500).json({ message: `${err}` })
    }
    if (detalle == null) {
        logger.error(`404 POST createDetalle, detalle nulos.`)
        return res.status(404).json({ message: `detalle nulos` })
    }
    logger.info(`200 POST createDetalle, ${detalle.itemagruparpersonaldetalle} itemagruparpersonaldetalle.`)
    detalle.dataValues.personal=asistencia.personal
    res.status(200).json(detalle)
}

async function deleteDetalle(req, res) {
    let [err, detalle] = await get(models.EsparragoAgrupaPersonalDetalle.update({
      estado: 'I',
  
      accion_usuario: 'Elimino un detalle.',
      accion: 'D',
      ip: req.ip,
      usuario: 0
    }, {
      where: {
        itemagruparpersonaldetalle: req.params.id
      },
      individualHooks: true
    }))
    if (err) {
      logger.error(`500 DELETE deleteDetalle, ${err}.`)
      return res.status(500).json({ message: `${err}` })
    }
    if (detalle == null) {
      logger.error(`404 DELETE deleteDetalle, detalle nulos.`)
      return res.status(404).json({ message: `detalle nulos` })
    }
    logger.info(`200 DELETE deleteDetalle, ${detalle[1][0].dataValues} values.`)
    res.status(200).json(detalle[1][0].dataValues)
  }


function get(promise) {
    return promise.then(data => {
        return [null, data];
    })
        .catch(err => [err]);
}

module.exports = {
    getLineasMesas,
    getDetalles,
    createDetalle,
    deleteDetalle,
}

const getQuery = (whereString, subQuery) => `
    SELECT *
        ${subQuery}
    FROM EsparragoAgrupaPersonal
    ${whereString};
`;

const selectSubQuery = `
    , (SELECT COUNT(*) FROM EsparragoAgrupaPersonalDetalle 
        where EsparragoAgrupaPersonalDetalle.itemagruparpersonal = EsparragoAgrupaPersonal.itemagruparpersonal
        ) as sizeDetails
`;