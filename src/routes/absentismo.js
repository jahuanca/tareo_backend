'use strict'
const express=require('express')
const router=express.Router()
const absentismo=require('../controllers/absentismo')
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
router.get('/',absentismo.getAbsentismos)
router.get('/count',absentismo.getAbsentismoCount)
router.get('/range&limit=:limit?&offset=:offset',absentismo.getAbsentismoByLimitAndOffset)
router.get('/id/:id',absentismo.getAbsentismo)
//router.post('/create',absentismo.createActividad)
//router.put('/update',absentismo.updateActividad)
//router.delete('/delete/:id', absentismo.deleteActividad)

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