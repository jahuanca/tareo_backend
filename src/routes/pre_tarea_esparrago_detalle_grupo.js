'use strict'
const express = require('express')
const router = express.Router()
const preTareaEsparragoDetalleGrupo = require('../controllers/pre_tarea_esparrago_detalle_grupo')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /PreTareaEsparragoDetalleGrupo/:
 *  get:
 *    tags: [PreTareaEsparragoDetalleGrupo]
 *    description: Obtiene todos los PreTareaEsparragoDetalleGrupos.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/', preTareaEsparragoDetalleGrupo.getPreTareaEsparragoDetalleGrupos)
router.get('/id/:id', preTareaEsparragoDetalleGrupo.getPreTareaEsparragoDetalleGrupo)
router.post('/create', preTareaEsparragoDetalleGrupo.createPreTareaEsparragoDetalleGrupo)
router.put('/update', preTareaEsparragoDetalleGrupo.updatePreTareaEsparragoDetalleGrupo)
router.delete('/delete/:id', preTareaEsparragoDetalleGrupo.deletePreTareaEsparragoDetalleGrupo)

module.exports = router
/**
* @swagger
*definitions:
*  PreTareaEsparragoDetalleGrupo:
*    type: object
*    required:
*      - cod_PreTareaEsparragoDetalleGrupo
*    properties:
*      cod_PreTareaEsparragoDetalleGrupo:
*        type: integer
*/
