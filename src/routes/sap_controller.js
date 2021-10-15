'use strict'
const express=require('express')
const router=express.Router()
const sap_controller=require('../controllers/sap_controller')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /nameMin/:
 *  get:
 *    tags: [nameMin]
 *    description: Obtiene todos los nameMins.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',sap_controller.getNames)


module.exports=router
/** 
* @swagger
*definitions:
*  nameMin:           
*    type: object
*    required:
*      - cod_nameMin
*    properties:
*      cod_nameMin:
*        type: integer
*/