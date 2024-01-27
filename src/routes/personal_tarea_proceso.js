'use strict'
const express = require('express')
const router = express.Router()
const personalTareaProceso = require('../controllers/personal_tarea_proceso')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

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
router.get('/', personalTareaProceso.getPersonalTareaProcesos)
router.get('/id/:id', personalTareaProceso.getPersonalTareaProceso)
router.post('/create', personalTareaProceso.createPersonalTareaProceso)
router.put('/update', personalTareaProceso.updatePersonalTareaProceso)
router.delete('/delete/:id', personalTareaProceso.deletePersonalTareaProceso)
router.post('/rango', personalTareaProceso.personalTareaProcesoByRango)
router.post('/migrar', personalTareaProceso.migrarContenido)

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
