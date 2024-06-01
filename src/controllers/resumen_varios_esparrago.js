'use strict'
const models = require('../models')

async function getResumen_Varios_Esparragos(req, res) {
    let [err, resumen_varios_esparragos] = await get(models.Resumen_Varios_Esparrago.findAll({
        /* where: { estado: 'A' },
        include: [{ all: true }] */
    }))
    if (err) return res.status(500).json({ message: `${err}` })
    if (resumen_varios_esparragos == null) return res.status(404).json({ message: `Resumen_Varios_Esparragos nulos` })
    res.status(200).json(resumen_varios_esparragos)
}

async function getResumen_Varios_Esparrago(req, res) {
    let [err, resumen_varios_esparrago] = await get(models.Resumen_Varios_Esparrago.findOne({
        where: { id: req.params.id, estado: 'A' },
        include: [{ all: true }]
    }))
    console.log(err)
    if (err) return res.status(500).json({ message: `${err}` })
    if (resumen_varios_esparrago == null) return res.status(404).json({ message: `Resumen_Varios_Esparragos nulos` })
    res.status(200).json(resumen_varios_esparrago)
}

async function createResumen_Varios_Esparrago(req, res) {
    console.log(req.body);
    /* return res.status(500).json({ message: `prueba` }); */

    let [errB, resumen]= await get(models.Resumen_Varios_Esparrago.findOne(
        {
            where: {
                imei: req.body.imei, 
                idcliente: req.body.idcliente,
                fecha: req.body.fecha, 
                idlabor: req.body.idlabor,
                linea: req.body.linea,
                mesa: req.body.mesa
            }
        }
    ));

    if(resumen==null){
        let [err, resumen_varios_esparrago] = await get(models.Resumen_Varios_Esparrago.create({
            imei: req.body.imei, 
            idcliente: req.body.idcliente,
            fecha: req.body.fecha, 
            idlabor: req.body.idlabor,
            linea: req.body.linea,
            mesa: req.body.mesa,
            cantidad: req.body.cantidad,
    
            accion: 'I',
            accion_usuario: 'Creo un nuevo resumen_varios_esparrago.',
            ip: req.ip,
            usuario: 0
        }))
        if (err) return res.status(500).json({ message: `${err}` })
        if (resumen_varios_esparrago == null) return res.status(404).json({ message: `Resumen_Varios_Esparragos nulos` })
        res.status(200).json(resumen_varios_esparrago)
    }else{
        let [err, resumen_varios_esparrago] = await get(models.Resumen_Varios_Esparrago.update({
            imei: req.body.imei, 
            idcliente: req.body.idcliente,
            fecha: req.body.fecha, 
            idlabor: req.body.idlabor,
            linea: req.body.linea,
            mesa: req.body.mesa,
    
            accion: 'U',
            accion_usuario: 'Edito un resumen_varios_esparrago.',
            ip: req.ip,
            usuario: 0
        }, {
            where: {
                imei: req.body.imei, 
                idcliente: req.body.idcliente,
                fecha: req.body.fecha, 
                idlabor: req.body.idlabor,
                linea: req.body.linea,
                mesa: req.body.mesa
            },
            individualHooks: true,
            validate: false
        }))
        if (err) return res.status(500).json({ message: `${err}` })
        if (resumen_varios_esparrago == null) return res.status(404).json({ message: `Resumen_Varios_Esparragos nulos` })
        res.status(200).json(resumen_varios_esparrago[1][0].dataValues)
    }

    
}


async function updateResumen_Varios_Esparrago(req, res) {
    let [err, resumen_varios_esparrago] = await get(models.Resumen_Varios_Esparrago.update({
        //all fields to update

        accion: 'U',
        accion_usuario: 'Edito un resumen_varios_esparrago.',
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
    if (resumen_varios_esparrago == null) return res.status(404).json({ message: `Resumen_Varios_Esparragos nulos` })
    res.status(200).json(resumen_varios_esparrago[1][0].dataValues)
}


async function deleteResumen_Varios_Esparrago(req, res) {
    let [err, resumen_varios_esparrago] = await get(models.Resumen_Varios_Esparrago.update({
        estado: 'I',

        accion_usuario: 'Elimino un resumen_varios_esparrago.',
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
    if (resumen_varios_esparrago == null) return res.status(404).json({ message: `Resumen_Varios_Esparragos nulos` })
    res.status(200).json(resumen_varios_esparrago[1][0].dataValues)
}


function get(promise) {
    return promise.then(data => {
        return [null, data];
    })
        .catch(err => [err]);
}

module.exports = {
    getResumen_Varios_Esparragos,
    getResumen_Varios_Esparrago,
    createResumen_Varios_Esparrago,
    updateResumen_Varios_Esparrago,
    deleteResumen_Varios_Esparrago
}