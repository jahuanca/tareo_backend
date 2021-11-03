
'use strict'
const express=require('express')
const router=express.Router()
const pre_tarea_esparrago_detalle_varios=require('../controllers/pre_tarea_esparrago_detalle_varios')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /PreTareaEsparragoDetalleVarios/:
 *  get:
 *    tags: [PreTareaEsparragoDetalleVarios]
 *    description: Obtiene todos los PreTareaEsparragoDetalleVarioss.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',pre_tarea_esparrago_detalle_varios.getPreTareaEsparragoDetalleVarioss)
router.get('/id/:id',pre_tarea_esparrago_detalle_varios.getPreTareaEsparragoDetalleVarios)
router.post('/create',pre_tarea_esparrago_detalle_varios.createPreTareaEsparragoDetalleVarios)
router.put('/update',pre_tarea_esparrago_detalle_varios.updatePreTareaEsparragoDetalleVarios)
router.delete('/delete/:id', pre_tarea_esparrago_detalle_varios.deletePreTareaEsparragoDetalleVarios)

module.exports=router
/** 
* @swagger
*definitions:
*  PreTareaEsparragoDetalleVarios:           
*    type: object
*    required:
*      - cod_PreTareaEsparragoDetalleVarios
*    properties:
*      cod_PreTareaEsparragoDetalleVarios:
*        type: integer
*/