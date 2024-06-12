'use strict'
const express = require('express')
const router = express.Router()
const {
  getSubdivisions,
  getSubdivision,
  createSubdivision,
  updateSubdivision,
  deleteSubdivision
} = require('../controllers/subdivision')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /Subdivision/:
 *  get:
 *    tags: [Subdivision]
 *    description: Obtiene todos los Subdivisions.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/', getSubdivisions)
router.get('/id/:id', getSubdivision)
router.post('/create', createSubdivision)
router.put('/update', updateSubdivision)
router.delete('/delete/:id', deleteSubdivision)

module.exports = router
/**
* @swagger
*definitions:
*  Subdivision:
*    type: object
*    required:
*      - cod_Subdivision
*    properties:
*      cod_Subdivision:
*        type: integer
*/
