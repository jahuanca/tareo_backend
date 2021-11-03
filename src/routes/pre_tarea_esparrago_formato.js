
'use strict'
const express=require('express')
const router=express.Router()
const pre_tarea_esparrago_formato=require('../controllers/pre_tarea_esparrago_formato')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /PreTareaEsparragoFormato/:
 *  get:
 *    tags: [PreTareaEsparragoFormato]
 *    description: Obtiene todos los PreTareaEsparragoFormatos.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',pre_tarea_esparrago_formato.getPreTareaEsparragoFormatos)
router.get('/id/:id',pre_tarea_esparrago_formato.getPreTareaEsparragoFormato)
router.post('/create',pre_tarea_esparrago_formato.createPreTareaEsparragoFormato)
router.put('/update',pre_tarea_esparrago_formato.updatePreTareaEsparragoFormato)
router.delete('/delete/:id', pre_tarea_esparrago_formato.deletePreTareaEsparragoFormato)

module.exports=router
/** 
* @swagger
*definitions:
*  PreTareaEsparragoFormato:           
*    type: object
*    required:
*      - cod_PreTareaEsparragoFormato
*    properties:
*      cod_PreTareaEsparragoFormato:
*        type: integer
*/