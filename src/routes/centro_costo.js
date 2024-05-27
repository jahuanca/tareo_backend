'use strict'
const express = require('express')
const router = express.Router()
const {
  getCentroCostos,
  getCentroCostoCount,
  getCentroCosto,
  createCentroCosto,
  updateCentroCosto,
  deleteCentroCosto,
  getCentroCostosByLimitAndOffset
} = require('../controllers/centro_costo')
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
router.get('/id/:id', getCentroCosto)
router.post('/create', createCentroCosto)
router.put('/update', updateCentroCosto)
router.delete('/delete/:id', deleteCentroCosto)
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
