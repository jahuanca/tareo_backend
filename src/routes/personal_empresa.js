'use strict'
const express = require('express')
const router = express.Router()
const personalEmpresa = require('../controllers/personal_empresa')
const { getDateWithZone } = require('../services/utils')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /Personal_Empresa/:
 *  get:
 *    tags: [Personal_Empresa]
 *    description: Obtiene todos los Personal_Empresas.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/', personalEmpresa.getPersonalEmpresas)
router.get('/count', personalEmpresa.getPersonalEmpresasCount)
router.get('/range', personalEmpresa.getPersonalEmpresasByLimitAndOffset)
router.get('/subdivision/:id', personalEmpresa.getPersonalEmpresaBySubdivision)
router.get('/subdivision/:id/active/:codigoempresa', personalEmpresa.getPersonalEmpresaBySubdivisionActive)
router.get('/id/:id', personalEmpresa.getPersonalEmpresa)
router.post('/create', personalEmpresa.createPersonalEmpresa)
router.put('/update', personalEmpresa.updatePersonalEmpresa)
router.delete('/delete/:id', personalEmpresa.deletePersonalEmpresa)

router.post('/date', (req, res) => {
  res.status(200).json({
    message: getDateWithZone(req.body.date)
  })
})

module.exports = router
/**
* @swagger
*definitions:
*  Personal_Empresa:
*    type: object
*    required:
*      - cod_Personal_Empresa
*    properties:
*      cod_Personal_Empresa:
*        type: integer
*/
