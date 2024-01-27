'use strict'
const express = require('express')
const router = express.Router()
const asistenciaRegistroPersonal = require('../controllers/asistencia_registro_personal')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

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
router.get('/', asistenciaRegistroPersonal.getAsistenciaRegistroPersonals)
router.get('/count', asistenciaRegistroPersonal.getAsistenciaRegistroPersonalsCount)
router.get('/range&limit=:limit?&offset=:offset', asistenciaRegistroPersonal.getAsistenciaRegistroPersonalsByLimitAndOffset)
router.get('/id/:id', asistenciaRegistroPersonal.getAsistenciaRegistroPersonal)
router.post('/create', asistenciaRegistroPersonal.createAsistenciaRegistroPersonal)
router.put('/update', asistenciaRegistroPersonal.updateAsistenciaRegistroPersonal)
router.delete('/delete/:id', asistenciaRegistroPersonal.deleteAsistenciaRegistroPersonal)
router.post('/registrar', asistenciaRegistroPersonal.registrar)

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
