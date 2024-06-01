'use strict'
const express=require('express')
const router=express.Router()
const temp_labor=require('../controllers/temp_labor')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /Temp_Labor/:
 *  get:
 *    tags: [Temp_Labor]
 *    description: Obtiene todos los Temp_Labors.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',temp_labor.getTemp_Labors)
router.get('/id/:id',temp_labor.getTemp_Labor)
router.post('/create',temp_labor.createTemp_Labor)
router.put('/update',temp_labor.updateTemp_Labor)
router.delete('/delete/:id', temp_labor.deleteTemp_Labor)

module.exports=router
/** 
* @swagger
*definitions:
*  Temp_Labor:           
*    type: object
*    required:
*      - cod_Temp_Labor
*    properties:
*      cod_Temp_Labor:
*        type: integer
*/