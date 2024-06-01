'use strict'
const express=require('express')
const router=express.Router()
const pre_tareo_proceso_detalle=require('../controllers/pre_tareo_proceso_detalle')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /Pre_Tareo_Proceso_Detalle/:
 *  get:
 *    tags: [Pre_Tareo_Proceso_Detalle]
 *    description: Obtiene todos los Pre_Tareo_Proceso_Detalles.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',pre_tareo_proceso_detalle.getPre_Tareo_Proceso_Detalles)
router.get('/id/:id',pre_tareo_proceso_detalle.getPre_Tareo_Proceso_Detalle)
router.post('/create',pre_tareo_proceso_detalle.createPre_Tareo_Proceso_Detalle)
router.put('/update',pre_tareo_proceso_detalle.updatePre_Tareo_Proceso_Detalle)
router.delete('/delete/:id', pre_tareo_proceso_detalle.deletePre_Tareo_Proceso_Detalle)

module.exports=router
/** 
* @swagger
*definitions:
*  Pre_Tareo_Proceso_Detalle:           
*    type: object
*    required:
*      - cod_Pre_Tareo_Proceso_Detalle
*    properties:
*      cod_Pre_Tareo_Proceso_Detalle:
*        type: integer
*/