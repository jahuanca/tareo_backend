
'use strict'
const express=require('express')
const router=express.Router()
const pre_tarea_esparrago=require('../controllers/pre_tarea_esparrago')
const upload_controller=require('../controllers/upload_controller')
/*const auth=require('../middlewares/auth')*/
/**
 * @swagger
 * /PreTareoEsparrago/:
 *  get:
 *    tags: [PreTareoEsparrago]
 *    description: Obtiene todos los PreTareoEsparragos.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',pre_tarea_esparrago.getPreTareoEsparragos)
router.get('/id/:id',pre_tarea_esparrago.getPreTareoEsparrago)
router.post('/create',pre_tarea_esparrago.createPreTareoEsparrago)
router.put('/update',pre_tarea_esparrago.updatePreTareoEsparrago)
router.delete('/delete/:id', pre_tarea_esparrago.deletePreTareoEsparrago)
router.put('/updateFile', upload_controller.upload() ,upload_controller.save('pre-tarea-esparrago') ,pre_tarea_esparrago.uploadFilePreTareaEsparrago)
router.post('/createAll',pre_tarea_esparrago.createAllPreTareaEsparrago)

module.exports=router
/** 
* @swagger
*definitions:
*  PreTareoEsparrago:           
*    type: object
*    required:
*      - cod_PreTareoEsparrago
*    properties:
*      cod_PreTareoEsparrago:
*        type: integer
*/