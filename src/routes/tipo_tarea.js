'use strict'
const express=require('express')
const router=express.Router()
const tipo_tarea=require('../controllers/tipo_tarea')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /Tipo_Tarea/:
 *  get:
 *    tags: [Tipo_Tarea]
 *    description: Obtiene todos los Tipo_Tareas.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',tipo_tarea.getTipo_Tareas)
router.get('/id/:id',tipo_tarea.getTipo_Tarea)
router.post('/create',tipo_tarea.createTipo_Tarea)
router.put('/update',tipo_tarea.updateTipo_Tarea)
router.delete('/delete/:id', tipo_tarea.deleteTipo_Tarea)

module.exports=router
/** 
* @swagger
*definitions:
*  Tipo_Tarea:           
*    type: object
*    required:
*      - cod_Tipo_Tarea
*    properties:
*      cod_Tipo_Tarea:
*        type: integer
*/