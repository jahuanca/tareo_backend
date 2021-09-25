'use strict'
const express=require('express')
const router=express.Router()
const temp_actividad=require('../controllers/temp_actividad')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /Temp_Actividad/:
 *  get:
 *    tags: [Temp_Actividad]
 *    description: Obtiene todos los Temp_Actividads.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',temp_actividad.getTemp_Actividads)
router.get('/id/:id',temp_actividad.getTemp_Actividad)
router.post('/create',temp_actividad.createTemp_Actividad)
router.put('/update',temp_actividad.updateTemp_Actividad)
router.delete('/delete/:id', temp_actividad.deleteTemp_Actividad)

module.exports=router
/** 
* @swagger
*definitions:
*  Temp_Actividad:           
*    type: object
*    required:
*      - cod_Temp_Actividad
*    properties:
*      cod_Temp_Actividad:
*        type: integer
*/