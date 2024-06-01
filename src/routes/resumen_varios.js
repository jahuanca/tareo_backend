'use strict'
const express=require('express')
const router=express.Router()
const resumen_varios=require('../controllers/resumen_varios')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /Resumen_Varios/:
 *  get:
 *    tags: [Resumen_Varios]
 *    description: Obtiene todos los Resumen_Varioss.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',resumen_varios.getResumen_Varioss)
router.get('/id/:id',resumen_varios.getResumen_Varios)
router.post('/create',resumen_varios.createResumen_Varios)
router.put('/update',resumen_varios.updateResumen_Varios)
router.delete('/delete/:id', resumen_varios.deleteResumen_Varios)

module.exports=router
/** 
* @swagger
*definitions:
*  Resumen_Varios:           
*    type: object
*    required:
*      - cod_Resumen_Varios
*    properties:
*      cod_Resumen_Varios:
*        type: integer
*/