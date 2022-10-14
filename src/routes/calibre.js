'use strict'
const express=require('express')
const router=express.Router()
const calibre=require('../controllers/calibre')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /Calibre/:
 *  get:
 *    tags: [Calibre]
 *    description: Obtiene todos los Calibres.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',calibre.getCalibres)
router.get('/count',calibre.getCalibresCount)
router.get('/range&limit=:limit?&offset=:offset',calibre.getCalibresByLimitAndOffset)
router.get('/id/:id',calibre.getCalibre)
router.post('/create',calibre.createCalibre)
router.put('/update',calibre.updateCalibre)
router.delete('/delete/:id', calibre.deleteCalibre)

module.exports=router
/** 
* @swagger
*definitions:
*  Calibre:           
*    type: object
*    required:
*      - cod_Calibre
*    properties:
*      cod_Calibre:
*        type: integer
*/