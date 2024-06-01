'use strict'
const express = require('express')
const router = express.Router()
const {
    getCentroCostos,
    getCentroCostoCount,
    getCentro_Costo,
    createCentro_Costo,
    updateCentro_Costo,
    deleteCentro_Costo,
    getCentroCostosByLimitAndOffset
} = require('../controllers/centro_costo')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /Centro_Costo/:
 *  get:
 *    tags: [Centro_Costo]
 *    description: Obtiene todos los Centro_Costos.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/', getCentroCostos)
router.get('/count', getCentroCostoCount)
router.get('/id/:id', getCentro_Costo)
router.post('/create', createCentro_Costo)
router.put('/update', updateCentro_Costo)
router.delete('/delete/:id', deleteCentro_Costo)
router.get('/range', getCentroCostosByLimitAndOffset)

module.exports = router
/**
* @swagger
*definitions:
*  Centro_Costo:
*    type: object
*    required:
*      - cod_Centro_Costo
*    properties:
*      cod_Centro_Costo:
*        type: integer
*/
