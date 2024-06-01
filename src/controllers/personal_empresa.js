'use strict'
const logger = require('../config/logger')
const models = require('../models')

async function getPersonalEmpresas (req, res) {
  const [err, personalEmpresas] = await get(models.Personal_Empresa.findAll({
    where: { itemgrupopersonal: 1 },
    include: [{ all: true }]
  }))
  if (err) {
    logger.error(`500 GET get_personal_empresas, ${err}.`)
    return res.status(500).json({ message: `${err}` })
  }
  if (personalEmpresas == null) {
    logger.error('404 GET get_personal_empresas, valor nulo.')
    return res.status(404).json({ message: 'personal_empresas nulos' })
  }
  logger.info(`200 GET get_personal_empresas ${personalEmpresas.length} values.`)
  res.status(200).json(personalEmpresas)
}

async function getPersonalEmpresasCount (req, res) {
  const [err, personalEmpresas] = await get(models.Personal_Empresa.count({
    where: { itemgrupopersonal: 1 },
    include: [{ all: true }]
  }))
  if (err) {
    logger.error(`500 GET getPersonal_EmpresasCount, ${err}.`)
    return res.status(500).json({ message: `${err}` })
  }
  if (personalEmpresas == null) {
    logger.error('404 GET getPersonal_EmpresasCount, valor nulo.')
    return res.status(404).json({ message: 'personal_empresas nulos' })
  }
  logger.info(`200 GET getPersonal_EmpresasCount ${personalEmpresas} values.`)
  res.status(200).json(personalEmpresas)
}

async function getPersonalEmpresasByLimitAndOffset (req, res) {
  const [err, personalEmpresas] = await get(models.Personal_Empresa.findAll({
    where: { itemgrupopersonal: 1 },
    include: [{ all: true }],
    offset: req.query.offset ? parseInt(req.query.offset) : 0,
    limit: req.query.limit ? parseInt(req.query.limit) : 10
  }))
  if (err) {
    logger.error(`500 GET getPersonal_EmpresasByLimitAndOffset, ${err}.`)
    return res.status(500).json({ message: `${err}` })
  }
  if (personalEmpresas == null) {
    logger.error('404 GET getPersonal_EmpresasByLimitAndOffset, valor nulo.')
    return res.status(404).json({ message: 'personal_empresas nulos' })
  }
  logger.info(`200 GET getPersonal_EmpresasByLimitAndOffset, limit: ${req.query.limit} y offset: ${req.query.offset}.`)
  res.status(200).json(personalEmpresas)
}

async function getPersonalEmpresa (req, res) {
  const [err, personalEmpresa] = await get(models.Personal_Empresa.findOne({
    where: { codigoempresa: req.params.id },
    include: [{ all: true }]
  }))
  if (err) return res.status(500).json({ message: `${err}` })
  if (personalEmpresa == null) return res.status(404).json({ message: 'Personal_Empresas nulos' })
  res.status(200).json(personalEmpresa)
}
// 0000679_ 218

async function getPersonalEmpresaBySubdivision (req, res) {
  const [err, personalEmpresa] = await get(models.Personal_Empresa.findAll({
    /* where:{id: req.params.id, estado: 'A'}, */
    include: [
      { model: models.PersonalEmpresa_Subdivision, where: { idsubdivision: req.params.id }, required: true }
    ]
  }))
  if (err) return res.status(500).json({ message: `${err}` })
  if (personalEmpresa == null) return res.status(404).json({ message: 'Personal_Empresas nulos' })
  res.status(200).json(personalEmpresa)
}

async function createPersonalEmpresa (req, res) {
  const [err, personalEmpresa] = await get(models.Personal_Empresa.create({
    // all fields to insert

    accion: 'I',
    accion_personal_empresa: 'Creo un nuevo personal_empresa.',
    ip: req.ip,
    personal_empresa: 0
  }))
  if (err) return res.status(500).json({ message: 'err' })
  if (personalEmpresa == null) return res.status(404).json({ message: 'Personal_Empresas nulos' })
  res.status(200).json(personalEmpresa)
}

async function updatePersonalEmpresa (req, res) {
  const [err, personalEmpresa] = await get(models.Personal_Empresa.update({
    // all fields to update

    accion: 'U',
    accion_personal_empresa: 'Edito un personal_empresa.',
    ip: req.ip,
    personal_empresa: 0
  }, {
    where: {
      id: req.body.id, estado: 'A'
    },
    individualHooks: true,
    validate: false
  }))
  if (err) return res.status(500).json({ message: 'err' })
  if (personalEmpresa == null) return res.status(404).json({ message: 'Personal_Empresas nulos' })
  res.status(200).json(personalEmpresa[1][0].dataValues)
}

async function deletePersonalEmpresa (req, res) {
  const [err, personalEmpresa] = await get(models.Personal_Empresa.update({
    estado: 'I',

    accion_personal_empresa: 'Elimino un personal_empresa.',
    accion: 'D',
    ip: req.ip,
    personal_empresa: 0
  }, {
    where: {
      id: req.params.id, estado: 'A'
    },
    individualHooks: true
  }))
  if (err) return res.status(500).json({ message: 'err' })
  if (personalEmpresa == null) return res.status(404).json({ message: 'Personal_Empresas nulos' })
  res.status(200).json(personalEmpresa[1][0].dataValues)
}

function get (promise) {
  return promise.then(data => {
    return [null, data]
  })
    .catch(err => [err])
}

module.exports = {
  getPersonalEmpresas,
  getPersonalEmpresasCount,
  getPersonalEmpresasByLimitAndOffset,
  getPersonalEmpresaBySubdivision,
  getPersonalEmpresa,
  createPersonalEmpresa,
  updatePersonalEmpresa,
  deletePersonalEmpresa
}
