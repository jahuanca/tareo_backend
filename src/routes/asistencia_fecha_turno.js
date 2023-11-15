'use strict'
const express=require('express')
const router=express.Router()
const asistenciaFechaTurno=require('../controllers/asistencia_fecha_turno')
const { upload ,save }=require('../controllers/upload_controller')
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
router.get('/',asistenciaFechaTurno.getAsistenciaFechaTurnos)
router.get('/count',asistenciaFechaTurno.getAsistenciaFechaTurnosCount)
router.get('/range&limit=:limit?&offset=:offset',asistenciaFechaTurno.getAsistenciaFechaTurnosByLimitAndOffset)
router.put('/updateFile', upload() , save('asistencia-fecha-turno') ,asistenciaFechaTurno.uploadFileAsistenciaFechaTurno)
router.get('/id/:id',asistenciaFechaTurno.getAsistenciaFechaTurno)
router.post('/create',asistenciaFechaTurno.createAsistenciaFechaTurno)
router.post('/createAll',asistenciaFechaTurno.createAllAsistenciaFechaTurno)
router.put('/update',asistenciaFechaTurno.updateAsistenciaFechaTurno)
router.delete('/delete/:id', asistenciaFechaTurno.deleteAsistenciaFechaTurno)

module.exports=router
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