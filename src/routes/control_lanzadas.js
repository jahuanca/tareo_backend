'use strict'
const express = require('express')
const router = express.Router()
const {
    getPesados,
    createPesado,
    deletePesado
} = require('./../controllers/control_lanzadas')

/**
 * @swagger
 * /AsistenciaPersonal/:
 *  get:
 *    tags: [AsistenciaPersonal]
 *    description: Obtiene todos los AsistenciaPersonals.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/pesados', getPesados)
router.post('/pesado/create', createPesado)
router.delete('/pesado/delete/:id', deletePesado)


module.exports = router
/** 
* @swagger
*definitions:
*  AsistenciaPersonal:           
*    type: object
*    required:
*      - cod_AsistenciaPersonal
*    properties:
*      cod_AsistenciaPersonal:
*        type: integer
*/