'use strict'
const express=require('express')
const router=express.Router()
const personal_pre_tarea_esparrago=require('../controllers/personal_pre_tarea_esparrago')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /Personal_Pre_Tarea_Esparrago/:
 *  get:
 *    tags: [Personal_Pre_Tarea_Esparrago]
 *    description: Obtiene todos los Personal_Pre_Tarea_Esparragos.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',personal_pre_tarea_esparrago.getPersonal_Pre_Tarea_Esparragos)
router.get('/count',personal_pre_tarea_esparrago.getPersonal_Pre_Tarea_EsparragosCount)
router.get('/range&limit=:limit?&offset=:offset',personal_pre_tarea_esparrago.getPersonal_Pre_Tarea_EsparragosByLimitAndOffset)
router.get('/id/:id',personal_pre_tarea_esparrago.getPersonal_Pre_Tarea_Esparrago)
router.post('/create',personal_pre_tarea_esparrago.createPersonal_Pre_Tarea_Esparrago)
router.put('/update',personal_pre_tarea_esparrago.updatePersonal_Pre_Tarea_Esparrago)
router.delete('/delete/:id', personal_pre_tarea_esparrago.deletePersonal_Pre_Tarea_Esparrago)

module.exports=router
/** 
* @swagger
*definitions:
*  Personal_Pre_Tarea_Esparrago:           
*    type: object
*    required:
*      - cod_Personal_Pre_Tarea_Esparrago
*    properties:
*      cod_Personal_Pre_Tarea_Esparrago:
*        type: integer
*/