'use strict'
const models = require('../models')

async function getPersonal_Empresa_Subdivisions (req, res) {
  const [err, personal_empresa_subdivisions] = await get(models.Personal_Empresa_Subdivision.findAll({
    /* where:{estado: 'A'}, */
    include: [{ all: true }]
  }))
  if (err) return res.status(500).json({ message: `${err}` })
  if (personal_empresa_subdivisions == null) return res.status(404).json({ message: 'Personal_Empresa_Subdivisions nulos' })
  res.status(200).json(personal_empresa_subdivisions)
}

async function getPersonal_Empresa_Subdivision (req, res) {
  const [err, personal_empresa_subdivision] = await get(models.Personal_Empresa_Subdivision.findOne({
    where: { id: req.params.id, estado: 'A' },
    include: [{ all: true }]
  }))
  console.log(err)
  if (err) return res.status(500).json({ message: 'err' })
  if (personal_empresa_subdivision == null) return res.status(404).json({ message: 'Personal_Empresa_Subdivisions nulos' })
  res.status(200).json(personal_empresa_subdivision)
}

async function createPersonal_Empresa_Subdivision (req, res) {
  const [err, personal_empresa_subdivision] = await get(models.Personal_Empresa_Subdivision.create({
    // all fields to insert

    accion: 'I',
    accion_usuario: 'Creo un nuevo personal_empresa_subdivision.',
    ip: req.ip,
    usuario: 0
  }))
  if (err) return res.status(500).json({ message: 'err' })
  if (personal_empresa_subdivision == null) return res.status(404).json({ message: 'Personal_Empresa_Subdivisions nulos' })
  res.status(200).json(personal_empresa_subdivision)
}

async function updatePersonal_Empresa_Subdivision (req, res) {
  const [err, personal_empresa_subdivision] = await get(models.Personal_Empresa_Subdivision.update({
    // all fields to update

    accion: 'U',
    accion_usuario: 'Edito un personal_empresa_subdivision.',
    ip: req.ip,
    usuario: 0
  }, {
    where: {
      id: req.body.id, estado: 'A'
    },
    individualHooks: true,
    validate: false
  }))
  if (err) return res.status(500).json({ message: 'err' })
  if (personal_empresa_subdivision == null) return res.status(404).json({ message: 'Personal_Empresa_Subdivisions nulos' })
  res.status(200).json(personal_empresa_subdivision[1][0].dataValues)
}

async function deletePersonal_Empresa_Subdivision (req, res) {
  const [err, personal_empresa_subdivision] = await get(models.Personal_Empresa_Subdivision.update({
    estado: 'I',

    accion_usuario: 'Elimino un personal_empresa_subdivision.',
    accion: 'D',
    ip: req.ip,
    usuario: 0
  }, {
    where: {
      id: req.params.id, estado: 'A'
    },
    individualHooks: true
  }))
  if (err) return res.status(500).json({ message: 'err' })
  if (personal_empresa_subdivision == null) return res.status(404).json({ message: 'Personal_Empresa_Subdivisions nulos' })
  res.status(200).json(personal_empresa_subdivision[1][0].dataValues)
}

function get (promise) {
  return promise.then(data => {
    return [null, data]
  })
    .catch(err => [err])
}

module.exports = {
  getPersonal_Empresa_Subdivisions,
  getPersonal_Empresa_Subdivision,
  createPersonal_Empresa_Subdivision,
  updatePersonal_Empresa_Subdivision,
  deletePersonal_Empresa_Subdivision
}
