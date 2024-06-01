'use strict'
const express=require('express')
const router=express.Router()
const cultivo=require('../controllers/cultivo')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /Cultivo/:
 *  get:
 *    tags: [Cultivo]
 *    description: Obtiene todos los Cultivos.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',cultivo.getCultivos)
router.get('/id/:id',cultivo.getCultivo)
router.post('/create',cultivo.createCultivo)
router.put('/update',cultivo.updateCultivo)
router.delete('/delete/:id', cultivo.deleteCultivo)

module.exports=router
/** 
* @swagger
*definitions:
*  Cultivo:           
*    type: object
*    required:
*      - cod_Cultivo
*    properties:
*      cod_Cultivo:
*        type: integer
*/