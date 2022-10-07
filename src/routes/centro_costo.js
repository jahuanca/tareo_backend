'use strict'
const express=require('express')
const router=express.Router()
const centro_costo=require('../controllers/centro_costo')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /Centro_Costo/:
 *  get:
 *    tags: [Centro_Costo]
 *    description: Obtiene todos los Centro_Costos.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',centro_costo.getCentro_Costos)
router.get('/count',centro_costo.getCentro_CostoCount)
router.get('/id/:id',centro_costo.getCentro_Costo)
router.post('/create',centro_costo.createCentro_Costo)
router.put('/update',centro_costo.updateCentro_Costo)
router.delete('/delete/:id', centro_costo.deleteCentro_Costo)
router.get('/range&limit=:limit?&offset=:offset',centro_costo.getCentro_CostoByLimitAndOffset)

module.exports=router
/** 
* @swagger
*definitions:
*  Centro_Costo:           
*    type: object
*    required:
*      - cod_Centro_Costo
*    properties:
*      cod_Centro_Costo:
*        type: integer
*/