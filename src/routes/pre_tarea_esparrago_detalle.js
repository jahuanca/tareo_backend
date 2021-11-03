
'use strict'
const express=require('express')
const router=express.Router()
const pre_tarea_esparrago_detalle=require('../controllers/pre_tarea_esparrago_detalle')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /PreTareaEsparragoDetalle/:
 *  get:
 *    tags: [PreTareaEsparragoDetalle]
 *    description: Obtiene todos los PreTareaEsparragoDetalles.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',pre_tarea_esparrago_detalle.getPreTareaEsparragoDetalles)
router.get('/id/:id',pre_tarea_esparrago_detalle.getPreTareaEsparragoDetalle)
router.post('/create',pre_tarea_esparrago_detalle.createPreTareaEsparragoDetalle)
router.put('/update',pre_tarea_esparrago_detalle.updatePreTareaEsparragoDetalle)
router.delete('/delete/:id', pre_tarea_esparrago_detalle.deletePreTareaEsparragoDetalle)

module.exports=router
/** 
* @swagger
*definitions:
*  PreTareaEsparragoDetalle:           
*    type: object
*    required:
*      - cod_PreTareaEsparragoDetalle
*    properties:
*      cod_PreTareaEsparragoDetalle:
*        type: integer
*/