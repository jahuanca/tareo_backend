'use strict'
const express = require('express')
const router = express.Router()
const asignacionPersonal = require('../controllers/asignacion_personal')

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
router.get('/lineasMesas', asignacionPersonal.getLineasMesas)
router.get('/detalles', asignacionPersonal.getDetalles)
router.post('/create', asignacionPersonal.createDetalle)
router.delete('/delete/:id', asignacionPersonal.deleteDetalle)

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
