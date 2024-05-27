'use strict'
const express = require('express')
const router = express.Router()
const {
  getPersonalTareaProcesos,
  getPersonalTareaProceso,
  createPersonalTareaProceso,
  updatePersonalTareaProceso,
  deletePersonalTareaProceso,
  personalTareaProcesoByRango,
  migrarContenido
} = require('./../controllers/personal_tarea_proceso')

/**
 * @swagger
 * /PersonalTareaProceso/:
 *  get:
 *    tags: [PersonalTareaProceso]
 *    description: Obtiene todos los PersonalTareaProcesos.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/', getPersonalTareaProcesos)
router.get('/id/:id', getPersonalTareaProceso)
router.post('/create', createPersonalTareaProceso)
router.put('/update', updatePersonalTareaProceso)
router.delete('/delete/:id', deletePersonalTareaProceso)
router.post('/rango', personalTareaProcesoByRango)
router.post('/migrar', migrarContenido)

module.exports = router
/**
* @swagger
*definitions:
*  PersonalTareaProceso:
*    type: object
*    required:
*      - cod_PersonalTareaProceso
*    properties:
*      cod_PersonalTareaProceso:
*        type: integer
*/
