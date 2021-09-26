'use strict'
const express=require('express')
const router=express.Router()
const labor=require('../controllers/labor')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /Labor/:
 *  get:
 *    tags: [Labor]
 *    description: Obtiene todos los Labors.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',labor.getLabors)
router.get('/id/:id',labor.getLabor)
router.post('/create',labor.createLabor)
router.put('/update',labor.updateLabor)
router.delete('/delete/:id', labor.deleteLabor)

module.exports=router
/** 
* @swagger
*definitions:
*  Labor:           
*    type: object
*    required:
*      - cod_Labor
*    properties:
*      cod_Labor:
*        type: integer
*/