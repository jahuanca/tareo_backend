'use strict'
const express=require('express')
const router=express.Router()
const labores_cultivo_packing=require('../controllers/labores_cultivo_packing')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /Labores_Cultivo_Packing/:  
 *  get:
 *    tags: [Labores_Cultivo_Packing]  
 *    description: Obtiene todos los Labores_Cultivo_Packings. 
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',labores_cultivo_packing.getLabores_Cultivo_Packings)
router.get('/id/:id',labores_cultivo_packing.getLabores_Cultivo_Packing)   
router.post('/create',labores_cultivo_packing.createLabores_Cultivo_Packing)   
router.put('/update',labores_cultivo_packing.updateLabores_Cultivo_Packing)
router.delete('/delete/:id', labores_cultivo_packing.deleteLabores_Cultivo_Packing)

module.exports=router
/** 
* @swagger
*definitions:
*  Labores_Cultivo_Packing:            
*    type: object
*    required:
*      - cod_Labores_Cultivo_Packing   
*    properties:
*      cod_Labores_Cultivo_Packing:
*        type: integer
*/