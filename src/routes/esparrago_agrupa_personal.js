'use strict'
const express=require('express')
const router=express.Router()
const es=require('../controllers/esparrago_agrupa_personal')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /Esparrago_Agrupa_Personal/:
 *  get:
 *    tags: [Esparrago_Agrupa_Personal]
 *    description: Obtiene todos los nameMins.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',es.getEsparrago_Agrupa_Personals)
router.get('/id/:id',es.getEsparrago_Agrupa_Personal)
router.post('/create',es.createEsparrago_Agrupa_Personal)
router.put('/update',es.updateEsparrago_Agrupa_Personal)
router.delete('/delete/:id', es.deleteEsparrago_Agrupa_Personal)

module.exports=router
/** 
* @swagger
*definitions:
*  Esparrago_Agrupa_Personal:           
*    type: object
*    required:
*      - cod_Esparrago_Agrupa_Personal
*    properties:
*      cod_Esparrago_Agrupa_Personal:
*        type: integer
*/