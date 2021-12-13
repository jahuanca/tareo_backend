'use strict'
const models = require('../models')

async function getResumen_Varioss(req, res) {
    let [err, resumen_varioss] = await get(models.Resumen_Varios.findAll({
        /* where: { estado: 'A' },
        include: [{ all: true }] */
    }))
    if (err) return res.status(500).json({ message: `${err}` })
    if (resumen_varioss == null) return res.status(404).json({ message: `Resumen_Varioss nulos` })
    res.status(200).json(resumen_varioss)
}

async function getResumen_Varios(req, res) {
    let [err, resumen_varios] = await get(models.Resumen_Varios.findOne({
        where: { id: req.params.id, estado: 'A' },
        include: [{ all: true }]
    }))
    console.log(err)
    if (err) return res.status(500).json({ message: `${err}` })
    if (resumen_varios == null) return res.status(404).json({ message: `Resumen_Varioss nulos` })
    res.status(200).json(resumen_varios)
}

async function createResumen_Varios(req, res) {
    /* console.log(req.body);
    return res.status(500).json({ message: `prueba` }); */

    let [errB, resumen]= await get(models.Resumen_Varios.findOne(
        {
            where: {
                imei: req.body.imei, turno: req.body.turno, fecha: req.body.fecha
            }
        }
    ));

    if(resumen==null){
        let [err, resumen_varios] = await get(models.Resumen_Varios.create({
            imei: req.body.imei,
            turno: req.body.turno,
            idlabor: req.body.idlabor,
            fecha: req.body.fecha,
            cantidad_cajas: req.body.cantidad_cajas,
            cantidad_personas: req.body.cantidad_personas,
    
            accion: 'I',
            accion_usuario: 'Creo un nuevo resumen_varios.',
            ip: req.ip,
            usuario: 0
        }))
        if (err) return res.status(500).json({ message: `${err}` })
        if (resumen_varios == null) return res.status(404).json({ message: `Resumen_Varioss nulos` })
        res.status(200).json(resumen_varios)
    }else{
        let [err, resumen_varios] = await get(models.Resumen_Varios.update({
            cantidad_cajas: req.body.cantidad_cajas,
            cantidad_personas: req.body.cantidad_personas,
            idlabor: req.body.idlabor,
    
            accion: 'U',
            accion_usuario: 'Edito un resumen_varios.',
            ip: req.ip,
            usuario: 0
        }, {
            where: {
                imei: req.body.imei, turno: req.body.turno, fecha: req.body.fecha
            },
            individualHooks: true,
            validate: false
        }))
        if (err) return res.status(500).json({ message: `${err}` })
        if (resumen_varios == null) return res.status(404).json({ message: `Resumen_Varioss nulos` })
        res.status(200).json(resumen_varios[1][0].dataValues)
    }

    
}


async function updateResumen_Varios(req, res) {
    let [err, resumen_varios] = await get(models.Resumen_Varios.update({
        //all fields to update

        accion: 'U',
        accion_usuario: 'Edito un resumen_varios.',
        ip: req.ip,
        usuario: 0
    }, {
        where: {
            id: req.body.id, estado: 'A'
        },
        individualHooks: true,
        validate: false
    }))
    if (err) return res.status(500).json({ message: `${err}` })
    if (resumen_varios == null) return res.status(404).json({ message: `Resumen_Varioss nulos` })
    res.status(200).json(resumen_varios[1][0].dataValues)
}


async function deleteResumen_Varios(req, res) {
    let [err, resumen_varios] = await get(models.Resumen_Varios.update({
        estado: 'I',

        accion_usuario: 'Elimino un resumen_varios.',
        accion: 'D',
        ip: req.ip,
        usuario: 0
    }, {
        where: {
            id: req.params.id, estado: 'A'
        },
        individualHooks: true
    }))
    if (err) return res.status(500).json({ message: `${err}` })
    if (resumen_varios == null) return res.status(404).json({ message: `Resumen_Varioss nulos` })
    res.status(200).json(resumen_varios[1][0].dataValues)
}


function get(promise) {
    return promise.then(data => {
        return [null, data];
    })
        .catch(err => [err]);
}

module.exports = {
    getResumen_Varioss,
    getResumen_Varios,
    createResumen_Varios,
    updateResumen_Varios,
    deleteResumen_Varios
}