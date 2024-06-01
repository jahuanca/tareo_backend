'use strict'
const express=require('express')
const router=express.Router()
const estado=require('../controllers/estado')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /Estado/:
 *  get:
 *    tags: [Estado]
 *    description: Obtiene todos los Estados.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',estado.getEstados)
router.get('/count',estado.getEstadosCount)
router.get('/range&limit=:limit?&offset=:offset',estado.getEstadosByLimitAndOffset)
router.get('/id/:id',estado.getEstado)
router.post('/create',estado.createEstado)
router.put('/update',estado.updateEstado)
router.delete('/delete/:id', estado.deleteEstado)

module.exports=router
/** 
* @swagger
*definitions:
*  Estado:           
*    type: object
*    required:
*      - cod_Estado
*    properties:
*      cod_Estado:
*        type: integer
*/