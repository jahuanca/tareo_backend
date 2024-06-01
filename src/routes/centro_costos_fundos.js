'use strict'
const express=require('express')
const router=express.Router()
const centro_costo_fundo=require('../controllers/centro_costo_fundo')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /Centro_Costo_Fundo/:
 *  get:
 *    tags: [Centro_Costo_Fundo]
 *    description: Obtiene todos los Centro_Costo_Fundos.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',centro_costo_fundo.getCentro_Costo_Fundos)
router.get('/id/:id',centro_costo_fundo.getCentro_Costo_Fundo)
router.post('/create',centro_costo_fundo.createCentro_Costo_Fundo)
router.put('/update',centro_costo_fundo.updateCentro_Costo_Fundo)
router.delete('/delete/:id', centro_costo_fundo.deleteCentro_Costo_Fundo)

module.exports=router
/** 
* @swagger
*definitions:
*  Centro_Costo_Fundo:           
*    type: object
*    required:
*      - cod_Centro_Costo_Fundo
*    properties:
*      cod_Centro_Costo_Fundo:
*        type: integer
*/