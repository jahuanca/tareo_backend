'use strict'
const express = require('express')
const router = express.Router()
const {
  getPesados,
  getPesadoPersonal,
  updatePesado,
  createPesado,
  deletePesado,
  deletePersonalPesado,
  createDetallePesado,
  createPersonalPesado
} = require('../controllers/pesado')

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
router.get('/', getPesados)
router.get('/personal', getPesadoPersonal)
router.post('/create', createPesado)
router.post('/createPersonal', createPersonalPesado)
router.put('/update', updatePesado)
router.post('/createDetalle', createDetallePesado)
router.delete('/delete/:id', deletePesado)
router.delete('/deletePersonal/:id', deletePersonalPesado)

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
