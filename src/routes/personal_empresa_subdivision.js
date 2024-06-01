'use strict'
const express=require('express')
const router=express.Router()
const personal_empresa_subdivision=require('../controllers/personal_empresa_subdivision')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /Personal_Empresa_Subdivision/:
 *  get:
 *    tags: [Personal_Empresa_Subdivision]
 *    description: Obtiene todos los Personal_Empresa_Subdivisions.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',personal_empresa_subdivision.getPersonal_Empresa_Subdivisions)
router.get('/id/:id',personal_empresa_subdivision.getPersonal_Empresa_Subdivision)
router.post('/create',personal_empresa_subdivision.createPersonal_Empresa_Subdivision)
router.put('/update',personal_empresa_subdivision.updatePersonal_Empresa_Subdivision)
router.delete('/delete/:id', personal_empresa_subdivision.deletePersonal_Empresa_Subdivision)

module.exports=router
/** 
* @swagger
*definitions:
*  Personal_Empresa_Subdivision:           
*    type: object
*    required:
*      - cod_Personal_Empresa_Subdivision
*    properties:
*      cod_Personal_Empresa_Subdivision:
*        type: integer
*/