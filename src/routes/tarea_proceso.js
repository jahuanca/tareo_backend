'use strict'
const express = require('express')
const router = express.Router()
const {
  getTareaProcesos,
  getTareaProceso,
  createTareaProceso,
  uploadFileTareaProceso,
  createAllTareaProceso,
  updateTareaProceso,
  deleteTareaProceso
} = require('../controllers/tarea_proceso')
const {
  upload,
  save

} = require('../controllers/upload_controller')
/* const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /TareaProceso/:
 *  get:
 *    tags: [TareaProceso]
 *    description: Obtiene todos los TareaProcesos.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/', getTareaProcesos)
router.get('/id/:id', getTareaProceso)
router.post('/create', createTareaProceso)
router.put('/updateFile', upload(), save('tarea-procesos'), uploadFileTareaProceso)
router.post('/createAll', createAllTareaProceso)
router.put('/update', updateTareaProceso)
router.delete('/delete/:id', deleteTareaProceso)

module.exports = router
/**
* @swagger
*definitions:
*  TareaProceso:
*    type: object
*    required:
*      - cod_TareaProceso
*    properties:
*      cod_TareaProceso:
*        type: integer
*/
