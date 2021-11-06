'use strict'
const express=require('express')
const router=express.Router()
const cliente=require('../controllers/cliente')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /Cliente/:
 *  get:
 *    tags: [Cliente]
 *    description: Obtiene todos los Clientes.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',cliente.getClientes)
router.get('/id/:id',cliente.getCliente)
router.post('/create',cliente.createCliente)
router.put('/update',cliente.updateCliente)
router.delete('/delete/:id', cliente.deleteCliente)

module.exports=router
/** 
* @swagger
*definitions:
*  Cliente:           
*    type: object
*    required:
*      - cod_Cliente
*    properties:
*      cod_Cliente:
*        type: integer
*/