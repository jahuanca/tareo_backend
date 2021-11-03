
'use strict'
const express=require('express')
const router=express.Router()
const pre_tarea_esparrago_varios=require('../controllers/pre_tarea_esparrago_varios')
const upload_controller=require('../controllers/upload_controller')
/*const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /PreTareaEsparragoVarios/:
 *  get:
 *    tags: [PreTareaEsparragoVarios]
 *    description: Obtiene todos los PreTareaEsparragoVarioss.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',pre_tarea_esparrago_varios.getPreTareaEsparragoVarioss)
router.get('/id/:id',pre_tarea_esparrago_varios.getPreTareaEsparragoVarios)
router.post('/create',pre_tarea_esparrago_varios.createPreTareaEsparragoVarios)
router.put('/update',pre_tarea_esparrago_varios.updatePreTareaEsparragoVarios)
router.delete('/delete/:id', pre_tarea_esparrago_varios.deletePreTareaEsparragoVarios)
router.put('/updateFile', upload_controller.upload() ,upload_controller.save('pre-tarea-esparrago-varios') ,pre_tarea_esparrago_varios.uploadFilePreTareaEsparragoVarios)
router.post('/createAll',pre_tarea_esparrago_varios.createAllPreTareaEsparragoVarios)

module.exports=router
/** 
* @swagger
*definitions:
*  PreTareaEsparragoVarios:           
*    type: object
*    required:
*      - cod_PreTareaEsparragoVarios
*    properties:
*      cod_PreTareaEsparragoVarios:
*        type: integer
*/