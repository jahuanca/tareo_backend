'use strict'
const express=require('express')
const router=express.Router()
const resumen_varios_esparrago=require('../controllers/resumen_varios_esparrago')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /Resumen_Varios_Esparrago/:
 *  get:
 *    tags: [Resumen_Varios_Esparrago]
 *    description: Obtiene todos los Resumen_Varios_Esparragos.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',resumen_varios_esparrago.getResumen_Varios_Esparragos)
router.get('/id/:id',resumen_varios_esparrago.getResumen_Varios_Esparrago)
router.post('/create',resumen_varios_esparrago.createResumen_Varios_Esparrago)
router.put('/update',resumen_varios_esparrago.updateResumen_Varios_Esparrago)
router.delete('/delete/:id', resumen_varios_esparrago.deleteResumen_Varios_Esparrago)

module.exports=router
/** 
* @swagger
*definitions:
*  Resumen_Varios:           
*    type: object
*    required:
*      - cod_Resumen_Varios
*    properties:
*      cod_Resumen_Varios:
*        type: integer
*/