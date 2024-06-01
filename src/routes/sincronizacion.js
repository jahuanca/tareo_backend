'use strict'
const express=require('express')
const router=express.Router()
const sincronizacion=require('../controllers/sincronizacion')

/**
 * @swagger
 * /Sincronizacion/:
 *  get:
 *    tags: [Sincronizacion]
 *    description: Obtiene todos los Sincronizacions.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',sincronizacion.getSincronizacions)
router.post('/personal',sincronizacion.sincronizarPersonal)
/* router.get('/count',sincronizacion.getSincronizacionsCount)
router.get('/range&limit=:limit?&offset=:offset',sincronizacion.getSincronizacionsByLimitAndOffset)
router.get('/id/:id',sincronizacion.getSincronizacion)
router.post('/create',sincronizacion.createSincronizacion)
router.put('/update',sincronizacion.updateSincronizacion)
 */

module.exports=router
/** 
* @swagger
*definitions:
*  Sincronizacion:           
*    type: object
*    required:
*      - cod_Sincronizacion
*    properties:
*      cod_Sincronizacion:
*        type: integer
*/