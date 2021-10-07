'use strict'
const express=require('express')
const router=express.Router()
const presentacion_linea=require('../controllers/presentacion_linea')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /Presentacion_Linea/:
 *  get:
 *    tags: [Presentacion_Linea]
 *    description: Obtiene todos los Presentacion_Lineas.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',presentacion_linea.getPresentacion_Lineas)
router.get('/id/:id',presentacion_linea.getPresentacion_Linea)
router.post('/create',presentacion_linea.createPresentacion_Linea)
router.put('/update',presentacion_linea.updatePresentacion_Linea)
router.delete('/delete/:id', presentacion_linea.deletePresentacion_Linea)

module.exports=router
/** 
* @swagger
*definitions:
*  Presentacion_Linea:           
*    type: object
*    required:
*      - cod_Presentacion_Linea
*    properties:
*      cod_Presentacion_Linea:
*        type: integer
*/