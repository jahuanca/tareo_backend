'use strict'
const express = require('express')
const router = express.Router()
const {
  getResumenLanzada,
  getResumenLanzadaError,
  getReportePesadoLineaMesa
} = require('../controllers/control_lanzada')

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
router.get('/resumen', getResumenLanzada)
router.get('/reportePesadoLineaMesa', getReportePesadoLineaMesa)
router.get('/resumenE', getResumenLanzadaError)

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
