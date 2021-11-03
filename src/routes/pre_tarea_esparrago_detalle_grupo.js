
'use strict'
const express=require('express')
const router=express.Router()
const pre_tarea_esparrago_detalle_grupo=require('../controllers/pre_tarea_esparrago_detalle_grupo')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /PreTareaEsparragoDetalleGrupo/:
 *  get: 
 *    tags: [PreTareaEsparragoDetalleGrupo]
 *    description: Obtiene todos los PreTareaEsparragoDetalleGrupos.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',pre_tarea_esparrago_detalle_grupo.getPreTareaEsparragoDetalleGrupos)
router.get('/id/:id',pre_tarea_esparrago_detalle_grupo.getPreTareaEsparragoDetalleGrupo)
router.post('/create',pre_tarea_esparrago_detalle_grupo.createPreTareaEsparragoDetalleGrupo)
router.put('/update',pre_tarea_esparrago_detalle_grupo.updatePreTareaEsparragoDetalleGrupo)
router.delete('/delete/:id', pre_tarea_esparrago_detalle_grupo.deletePreTareaEsparragoDetalleGrupo)

module.exports=router
/** 
* @swagger
*definitions:
*  PreTareaEsparragoDetalleGrupo:           
*    type: object
*    required:
*      - cod_PreTareaEsparragoDetalleGrupo
*    properties:
*      cod_PreTareaEsparragoDetalleGrupo:
*        type: integer
*/