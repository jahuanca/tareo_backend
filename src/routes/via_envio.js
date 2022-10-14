'use strict'
const express=require('express')
const router=express.Router()
const via_envio=require('../controllers/via_envio')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /Via_Envio/:
 *  get:
 *    tags: [Via_Envio]
 *    description: Obtiene todos los Via_Envios.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',via_envio.getVia_Envios)
router.get('/count',via_envio.getVia_EnviosCount)
router.get('/range&limit=:limit?&offset=:offset',via_envio.getVia_EnviosByLimitAndOffset)
router.get('/id/:id',via_envio.getVia_Envio)
router.post('/create',via_envio.createVia_Envio)
router.put('/update',via_envio.updateVia_Envio)
router.delete('/delete/:id', via_envio.deleteVia_Envio)

module.exports=router
/** 
* @swagger
*definitions:
*  Via_Envio:           
*    type: object
*    required:
*      - cod_Via_Envio
*    properties:
*      cod_Via_Envio:
*        type: integer
*/