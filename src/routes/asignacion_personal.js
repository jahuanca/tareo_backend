'use strict'
const express = require('express')
const router = express.Router()
const {
  getLineasMesas,
  getDetallesAsignacionPersonal,
  createDetalle,
  deleteDetalle
} = require('../controllers/asignacion_personal')

/**
 * @swagger
 * /AsistenciaPersonal/:
 *  get:
 *    tags: [AsistenciaPersonal]
 *    description: Obtiene todos los AsistenciaPersonals.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/lineasMesas', getLineasMesas)
router.get('/detalles', getDetallesAsignacionPersonal)
router.post('/create', createDetalle)
router.delete('/delete/:id', deleteDetalle)

module.exports = router
/**
* @swagger
*definitions:
*  AsistenciaPersonal:
*    type: object
*    required:
*      - cod_AsistenciaPersonal
*    properties:
*      cod_AsistenciaPersonal:
*        type: integer
*/
