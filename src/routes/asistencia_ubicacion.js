'use strict'
const express=require('express')
const router=express.Router()
const asistenciaUbicacion=require('../controllers/asistencia_ubicacion')
/*const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth')*/

/**
 * @swagger
 * /AsistenciaUbicacion/:
 *  get:
 *    tags: [AsistenciaUbicacion]
 *    description: Obtiene todos los AsistenciaUbicacions.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',asistenciaUbicacion.getAsistenciaUbicacions)
router.get('/count',asistenciaUbicacion.getAsistenciaUbicacionsCount)
router.get('/range&limit=:limit?&offset=:offset',asistenciaUbicacion.getAsistenciaUbicacionsByLimitAndOffset)
router.get('/id/:id',asistenciaUbicacion.getAsistenciaUbicacion)
router.post('/create',asistenciaUbicacion.createAsistenciaUbicacion)
router.put('/update',asistenciaUbicacion.updateAsistenciaUbicacion)
router.delete('/delete/:id', asistenciaUbicacion.deleteAsistenciaUbicacion)

module.exports=router
/** 
* @swagger
*definitions:
*  AsistenciaUbicacion:           
*    type: object
*    required:
*      - cod_AsistenciaUbicacion
*    properties:
*      cod_AsistenciaUbicacion:
*        type: integer
*/