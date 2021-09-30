'use strict'
const express=require('express')
const router=express.Router()
const tareaProceso=require('../controllers/tarea_proceso')
 const upload_controller=require('../controllers/upload_controller')
/*const auth=require('../middlewares/auth') */

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
router.get('/',tareaProceso.getTareaProcesos)
router.get('/id/:id',tareaProceso.getTareaProceso)
router.post('/create',tareaProceso.createTareaProceso)
router.put('/updateFile', upload_controller.upload() ,upload_controller.save('tarea-procesos') ,tareaProceso.uploadFileTareaProceso)
router.post('/createAll',tareaProceso.createAllTareaProceso)
router.put('/update',tareaProceso.updateTareaProceso)
router.delete('/delete/:id', tareaProceso.deleteTareaProceso)

module.exports=router
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