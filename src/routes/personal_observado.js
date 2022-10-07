'use strict'
const express=require('express')
const router=express.Router()
const personal_observado=require('../controllers/personal_observado')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /Personal_Empresa/:
 *  get:
 *    tags: [Personal_Empresa]
 *    description: Obtiene todos los Personal_Empresas.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',personal_observado.getPersonal_Observado)
router.get('/count',personal_observado.getPersonal_ObservadoCount)
router.get('/range&limit=:limit?&offset=:offset',personal_observado.getPersonal_ObservadoByLimitAndOffset)
//router.get('/subdivision/:id',personal_observado.getPersonal_ObservadoBySubdivision)
router.get('/id/:id',personal_observado.getPersonal_Observado1)
//router.post('/create',personal_observado.createPersonal_Observado)
//router.put('/update',personal_observado.updatePersonal_Observado)
//router.delete('/delete/:id', personal_observado.deletePersonal_Observado)

module.exports=router
/** 
* @swagger
*definitions:
*  Personal_Empresa:           
*    type: object
*    required:
*      - cod_Personal_Empresa
*    properties:
*      cod_Personal_Empresa:
*        type: integer
*/