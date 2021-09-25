'use strict'
const express=require('express')
const router=express.Router()
const actividad=require('../controllers/actividad')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /Actividad/:
 *  get:
 *    tags: [Actividad]
 *    description: Obtiene todos los Actividads.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',actividad.getActividads)
router.get('/id/:id',actividad.getActividad)
router.post('/create',actividad.createActividad)
router.put('/update',actividad.updateActividad)
router.delete('/delete/:id', actividad.deleteActividad)

module.exports=router
/** 
* @swagger
*definitions:
*  Actividad:           
*    type: object
*    required:
*      - cod_Actividad
*    properties:
*      cod_Actividad:
*        type: integer
*/