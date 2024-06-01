
'use strict'
const express=require('express')
const router=express.Router()
const pre_tarea_esparrago_grupo=require('../controllers/pre_tarea_esparrago_grupo')
const upload_controller=require('../controllers/upload_controller')
/* const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /PreTareaEsparragoGrupo/:
 *  get:
 *    tags: [PreTareaEsparragoGrupo]
 *    description: Obtiene todos los PreTareaEsparragoGrupos.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',pre_tarea_esparrago_grupo.getPreTareaEsparragoGrupos)
router.get('/id/:id',pre_tarea_esparrago_grupo.getPreTareaEsparragoGrupo)
router.post('/create',pre_tarea_esparrago_grupo.createPreTareaEsparragoGrupo)
router.put('/update',pre_tarea_esparrago_grupo.updatePreTareaEsparragoGrupo)
router.delete('/delete/:id', pre_tarea_esparrago_grupo.deletePreTareaEsparragoGrupo)
router.put('/updateFile', upload_controller.upload() ,upload_controller.save('pre-tarea-proceso-uva') ,pre_tarea_esparrago_grupo.uploadFilePreTareaEsparragoGrupo)
router.post('/createAll',pre_tarea_esparrago_grupo.createAllPreTareaEsparragoGrupo)

module.exports=router
/** 
* @swagger
*definitions:
*  PreTareaEsparragoGrupo:           
*    type: object
*    required:
*      - cod_PreTareaEsparragoGrupo
*    properties:
*      cod_PreTareaEsparragoGrupo:
*        type: integer
*/