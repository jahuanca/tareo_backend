'use strict'
const express=require('express')
const router=express.Router()
const pre_tareo_proceso=require('../controllers/pre_tareo_proceso')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /Pre_Tareo_Proceso/:
 *  get:
 *    tags: [Pre_Tareo_Proceso]
 *    description: Obtiene todos los Pre_Tareo_Procesos.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',pre_tareo_proceso.getPre_Tareo_Procesos)
router.get('/id/:id',pre_tareo_proceso.getPre_Tareo_Proceso)
router.post('/create',pre_tareo_proceso.createPre_Tareo_Proceso)
router.post('/createAll',pre_tareo_proceso.createAllPreTareoProceso)
router.put('/update',pre_tareo_proceso.updatePre_Tareo_Proceso)
router.delete('/delete/:id', pre_tareo_proceso.deletePre_Tareo_Proceso)

module.exports=router
/** 
* @swagger
*definitions:
*  Pre_Tareo_Proceso:           
*    type: object
*    required:
*      - cod_Pre_Tareo_Proceso
*    properties:
*      cod_Pre_Tareo_Proceso:
*        type: integer
*/