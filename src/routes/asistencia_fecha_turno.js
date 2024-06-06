'use strict'
const express = require('express')
const router = express.Router()
const {
  getAsistenciaFechaTurnos,
  getAsistenciaFechaTurnosCount,
  getAsistenciaFechaTurnosByLimitAndOffset,
  uploadFileAsistenciaFechaTurno,
  getAsistenciaFechaTurno,
  createAsistenciaFechaTurno,
  createAllAsistenciaFechaTurno,
  updateAsistenciaFechaTurno,
  deleteAsistenciaFechaTurno
} = require('../controllers/asistencia_fecha_turno')
const { upload, save } = require('../controllers/upload_controller')
/**
 * @swagger
 * /AsistenciaFechaTurno/:
 *  get:
 *    tags: [AsistenciaFechaTurno]
 *    description: Obtiene todos los AsistenciaFechaTurnos.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/', getAsistenciaFechaTurnos)
router.get('/count', getAsistenciaFechaTurnosCount)
router.get('/range&limit=:limit?&offset=:offset', getAsistenciaFechaTurnosByLimitAndOffset)
router.put('/updateFile', upload(), save('asistencia-fecha-turno'), uploadFileAsistenciaFechaTurno)
router.get('/id/:id', getAsistenciaFechaTurno)
router.post('/create', createAsistenciaFechaTurno)
router.post('/createAll', createAllAsistenciaFechaTurno)
router.put('/update', updateAsistenciaFechaTurno)
router.delete('/delete/:id', deleteAsistenciaFechaTurno)

module.exports = router
/**
* @swagger
*definitions:
*  AsistenciaFechaTurno:
*    type: object
*    required:
*      - cod_AsistenciaFechaTurno
*    properties:
*      cod_AsistenciaFechaTurno:
*        type: integer
*/
