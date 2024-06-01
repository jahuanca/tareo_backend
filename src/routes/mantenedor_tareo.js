'use strict'
const express=require('express')
const router=express.Router()
const mantenedor_tareo=require('../controllers/mantenedor_tareo')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /Mantenedor_Tareo/:
 *  get:
 *    tags: [Mantenedor_Tareo]
 *    description: Obtiene todos los Mantenedor_Tareos.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',mantenedor_tareo.getMantenedor_Tareos)
router.get('/id/:id',mantenedor_tareo.getMantenedor_Tareo)
router.post('/create',mantenedor_tareo.createMantenedor_Tareo)
router.put('/update',mantenedor_tareo.updateMantenedor_Tareo)
router.delete('/delete/:id', mantenedor_tareo.deleteMantenedor_Tareo)

module.exports=router
/** 
* @swagger
*definitions:
*  Mantenedor_Tareo:           
*    type: object
*    required:
*      - cod_Mantenedor_Tareo
*    properties:
*      cod_Mantenedor_Tareo:
*        type: integer
*/