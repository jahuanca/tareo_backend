'use strict'
const express = require('express')
const router = express.Router()
const {
  getEsparragoAgrupaPersonals,
  getEsparragoAgrupaPersonal,
  createEsparragoAgrupaPersonal,
  updateEsparragoAgrupaPersonal,
  deleteEsparragoAgrupaPersonal,
  getEsparragoAgrupaPersonalByLimitAndOffset,
  getEsparragoAgrupaPersonalCount
} = require('../controllers/esparrago_agrupa_personal')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /EsparragoAgrupaPersonal/:
 *  get:
 *    tags: [EsparragoAgrupaPersonal]
 *    description: Obtiene todos los nameMins.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/', getEsparragoAgrupaPersonals)
router.get('/count', getEsparragoAgrupaPersonalCount)
router.get('/range', getEsparragoAgrupaPersonalByLimitAndOffset)
router.get('/id/:id', getEsparragoAgrupaPersonal)
router.post('/create', createEsparragoAgrupaPersonal)
router.put('/update', updateEsparragoAgrupaPersonal)
router.delete('/delete/:id', deleteEsparragoAgrupaPersonal)

module.exports = router
/**
* @swagger
*definitions:
*  EsparragoAgrupaPersonal:
*    type: object
*    required:
*      - cod_EsparragoAgrupaPersonal
*    properties:
*      cod_EsparragoAgrupaPersonal:
*        type: integer
*/
