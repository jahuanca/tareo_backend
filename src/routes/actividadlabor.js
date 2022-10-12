'use strict'
const express=require('express')
const router=express.Router()
const actividadlabor=require('../controllers/actividadlabor')
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
router.get('/',actividadlabor.getActividadLabores)
router.get('/count',actividadlabor.getActividadLaborCount)
router.get('/range&limit=:limit?&offset=:offset',actividadlabor.getActividadLaborByLimitAndOffset)
router.get('/id/:id',actividadlabor.getActividadLabor)
router.post('/create',actividadlabor.createActividadLabor)
router.put('/update',actividadlabor.updateActividadLabor)
router.delete('/delete/:id', actividadlabor.deleteActividadLabor)

module.exports=router
/** 
* @swagger
*definitions:
*  ActividadLabor:           
*    type: object
*    required:
*      - cod_Actividad
*    properties:
*      cod_Actividad:
*        type: integer
*/