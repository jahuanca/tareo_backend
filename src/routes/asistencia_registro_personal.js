'use strict'
const express = require('express')
const router = express.Router()
const {
  getAsistenciaRegistroPersonals,
  getAsistenciaRegistroPersonalsCount,
  getAsistenciaRegistroPersonalsByLimitAndOffset,
  getAsistenciaRegistroPersonal,
  createAsistenciaRegistroPersonal,
  updateAsistenciaRegistroPersonal,
  deleteAsistenciaRegistroPersonal,
  registrar
} = require('../controllers/asistencia_registro_personal')

/**
 * @swagger
 * /AsistenciaRegistroPersonal/:
 *  get:
 *    tags: [AsistenciaRegistroPersonal]
 *    description: Obtiene todos los AsistenciaRegistroPersonals.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/', getAsistenciaRegistroPersonals)
router.get('/count', getAsistenciaRegistroPersonalsCount)
router.get('/range&limit=:limit?&offset=:offset', getAsistenciaRegistroPersonalsByLimitAndOffset)
router.get('/id/:id', getAsistenciaRegistroPersonal)
router.post('/create', createAsistenciaRegistroPersonal)
router.put('/update', updateAsistenciaRegistroPersonal)
router.delete('/delete/:id', deleteAsistenciaRegistroPersonal)
router.post('/registrar', registrar)

module.exports = router
/**
* @swagger
*definitions:
*  AsistenciaRegistroPersonal:
*    type: object
*    required:
*      - cod_AsistenciaRegistroPersonal
*    properties:
*      cod_AsistenciaRegistroPersonal:
*        type: integer
*/
