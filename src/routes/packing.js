'use strict'
const express = require('express')
const router = express.Router()
const {
  getPackings, getPersonalPacking, createPacking, createPersonalPacking,
  deletePersonalPacking, updatePacking, deletePacking, getReportPacking
} = require('../controllers/packing')

/**
 * @swagger
 * /Packing/:
 *  get:
 *    tags: [Packing]
 *    description: Obtiene todos los Packings.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/', getPackings)
router.get('/personal/:id', getPersonalPacking)
router.get('/report', getReportPacking)
router.post('/create', createPacking)
router.post('/createPersonal', createPersonalPacking)
router.delete('/deletePersonal/:id', deletePersonalPacking)
router.delete('/delete/:id', deletePacking)
router.put('/update', updatePacking)
router.post('/test', createPersonalPacking)

module.exports = router
/**
* @swagger
*definitions:
*  Packing:
*    type: object
*    required:
*      - cod_Packing
*    properties:
*      cod_Packing:
*        type: integer
*/
