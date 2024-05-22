'use strict'
const express = require('express')
const router = express.Router()
const preTareoProcesoUvaDetalle = require('../controllers/pre_tareo_proceso_uva_detalle')
/* const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /Pre_Tareo_Proceso_Uva_Detalle/:
 *  get:
 *    tags: [Pre_Tareo_Proceso_Uva_Detalle]
 *    description: Obtiene todos los Pre_Tareo_Proceso_Uva_Detalles.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/', preTareoProcesoUvaDetalle.getPre_Tareo_Proceso_Uva_Detalles)
router.get('/id/:id', preTareoProcesoUvaDetalle.getPre_Tareo_Proceso_Uva_Detalle)
router.get('/master/:id', preTareoProcesoUvaDetalle.getPre_Tareo_Proceso_Uva_DetalleByMaster)
router.post('/create', preTareoProcesoUvaDetalle.createPre_Tareo_Proceso_Uva_Detalle)
router.post('/rango', preTareoProcesoUvaDetalle.preTareaProcesoUvaDetalleByRango)
router.put('/update', preTareoProcesoUvaDetalle.updatePre_Tareo_Proceso_Uva_Detalle)
router.delete('/delete/:id', preTareoProcesoUvaDetalle.deletePre_Tareo_Proceso_Uva_Detalle)

module.exports = router
/**
* @swagger
*definitions:
*  Pre_Tareo_Proceso_Uva_Detalle:
*    type: object
*    required:
*      - cod_Pre_Tareo_Proceso_Uva_Detalle
*    properties:
*      cod_Pre_Tareo_Proceso_Uva_Detalle:
*        type: integer
*/
