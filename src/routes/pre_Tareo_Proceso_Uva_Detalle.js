'use strict'
const express=require('express')
const router=express.Router()
const pre_Tareo_Proceso_Uva_Detalle=require('../controllers/Pre_Tareo_Proceso_Uva_Detalle')
const upload_controller=require('../controllers/upload_controller')
/* const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /Pre_Tareo_Proceso_Uva_Detalle/:
 *  get:
 *    tags: [Pre_Tareo_Proceso_Uva_Detalle]
 *    description: Obtiene todos los Pre_Tareo_Proceso_Uva_Detalles.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',pre_Tareo_Proceso_Uva_Detalle.getPre_Tareo_Proceso_Uva_Detalles)
router.get('/id/:id',pre_Tareo_Proceso_Uva_Detalle.getPre_Tareo_Proceso_Uva_Detalle)
router.get('/master/:id',pre_Tareo_Proceso_Uva_Detalle.getPre_Tareo_Proceso_Uva_DetalleByMaster)
router.post('/create',pre_Tareo_Proceso_Uva_Detalle.createPre_Tareo_Proceso_Uva_Detalle)
router.post('/rango',pre_Tareo_Proceso_Uva_Detalle.preTareaProcesoUvaDetalleByRango)
router.put('/update',pre_Tareo_Proceso_Uva_Detalle.updatePre_Tareo_Proceso_Uva_Detalle)
router.delete('/delete/:id', pre_Tareo_Proceso_Uva_Detalle.deletePre_Tareo_Proceso_Uva_Detalle)

module.exports=router
/** 
* @swagger
*definitions:
*  Pre_Tareo_Proceso_Uva_Detalle:           
*    type: object
*    required:
*      - cod_Pre_Tareo_Proceso_Uva_Detalle
*    properties:
*      cod_Pre_Tareo_Proceso_Uva_Detalle:
*        type: integer
*/