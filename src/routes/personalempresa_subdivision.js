'use strict'
const express=require('express')
const router=express.Router()
const personalempresa_subdivision=require('../controllers/personalempresa_subdivision')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /PersonalEmpresa_Subdivision/:
 *  get:
 *    tags: [PersonalEmpresa_Subdivision]
 *    description: Obtiene todos los PersonalEmpresa_Subdivisions.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',personalempresa_subdivision.getPersonalEmpresa_Subdivisions)
router.get('/id/:id',personalempresa_subdivision.getPersonalEmpresa_Subdivision)
router.get('/subdivision/:id',personalempresa_subdivision.getPersonalEmpresa_SubdivisionBySubdivision)
router.post('/create',personalempresa_subdivision.createPersonalEmpresa_Subdivision)
router.put('/update',personalempresa_subdivision.updatePersonalEmpresa_Subdivision)
router.delete('/delete/:id', personalempresa_subdivision.deletePersonalEmpresa_Subdivision)

module.exports=router
/** 
* @swagger
*definitions:
*  PersonalEmpresa_Subdivision:           
*    type: object
*    required:
*      - cod_PersonalEmpresa_Subdivision
*    properties:
*      cod_PersonalEmpresa_Subdivision:
*        type: integer
*/