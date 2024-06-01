'use strict'
const express=require('express')
const router=express.Router()
const division=require('../controllers/division')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /Division/:
 *  get:
 *    tags: [Division]
 *    description: Obtiene todos los Divisions.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',division.getDivisions)
router.get('/id/:id',division.getDivision)
router.post('/create',division.createDivision)
router.put('/update',division.updateDivision)
router.delete('/delete/:id', division.deleteDivision)

module.exports=router
/** 
* @swagger
*definitions:
*  Division:           
*    type: object
*    required:
*      - cod_Division
*    properties:
*      cod_Division:
*        type: integer
*/