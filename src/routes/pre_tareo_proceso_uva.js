'use strict'
const express=require('express')
const router=express.Router()
const pre_tareo_proceso_uva=require('../controllers/pre_tareo_proceso_uva')
const upload_controller=require('../controllers/upload_controller')
/* const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /Pre_Tareo_Proceso_Uva/:
 *  get:
 *    tags: [Pre_Tareo_Proceso_Uva]
 *    description: Obtiene todos los Pre_Tareo_Proceso_Uvas.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',pre_tareo_proceso_uva.getPre_Tareo_Proceso_Uvas)
router.get('/id/:id',pre_tareo_proceso_uva.getPre_Tareo_Proceso_Uva)
router.post('/create',pre_tareo_proceso_uva.createPre_Tareo_Proceso_Uva)
router.put('/updateFile', upload_controller.upload() ,upload_controller.save('pre-tarea-proceso-uvas') ,pre_tareo_proceso_uva.uploadFilePreTareoProcesoUva)
router.post('/createAll',pre_tareo_proceso_uva.createAllPreTareoProcesoUva)
router.put('/update',pre_tareo_proceso_uva.updatePre_Tareo_Proceso_Uva)
router.delete('/delete/:id', pre_tareo_proceso_uva.deletePre_Tareo_Proceso_Uva)

module.exports=router
/** 
* @swagger
*definitions:
*  Pre_Tareo_Proceso_Uva:           
*    type: object
*    required:
*      - cod_Pre_Tareo_Proceso_Uva
*    properties:
*      cod_Pre_Tareo_Proceso_Uva:
*        type: integer
*/