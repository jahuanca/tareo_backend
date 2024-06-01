'use strict'
const express=require('express')
const router=express.Router()
const turno=require('../controllers/turno')
/*const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth')*/

/**
 * @swagger
 * /Turno/:
 *  get:
 *    tags: [Turno]
 *    description: Obtiene todos los Turnos.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',turno.getTurnos)
router.get('/count',turno.getTurnosCount)
router.get('/range&limit=:limit?&offset=:offset',turno.getTurnosByLimitAndOffset)
router.get('/id/:id',turno.getTurno)
router.post('/create',turno.createTurno)
router.put('/update',turno.updateTurno)
router.delete('/delete/:id', turno.deleteTurno)

module.exports=router
/** 
* @swagger
*definitions:
*  Turno:           
*    type: object
*    required:
*      - cod_Turno
*    properties:
*      cod_Turno:
*        type: integer
*/