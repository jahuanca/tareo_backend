'use strict'
const models = require('../models')

async function getTareaProcesos(req, res) {
    let [err, tareaProcesos] = await get(models.TareaProceso.findAll({
        /* where: { estado: 'A' },
        include: [{ all: true }] */
    }))
    if (err) return res.status(500).json({ message: `${err}` })
    if (tareaProcesos == null) return res.status(404).json({ message: `TareaProcesos nulos` })
    res.status(200).json(tareaProcesos)
}

async function getTareaProceso(req, res) {
    let [err, tareaProceso] = await get(models.TareaProceso.findOne({
        where: { id: req.params.id, estado: 'A' },
        include: [{ all: true }]
    }))
    console.log(err)
    if (err) return res.status(500).json({ message: `${err}` })
    if (tareaProceso == null) return res.status(404).json({ message: `TareaProcesos nulos` })
    res.status(200).json(tareaProceso)
}

async function createTareaProceso(req, res) {
    let [err, tareaProceso] = await get(models.TareaProceso.create({
        //all fields to insert

        accion: 'I',
        accion_usuario: 'Creo un nuevo tareaProceso.',
        ip: req.ip,
        usuario: 0
    }))
    if (err) return res.status(500).json({ message: `${err}` })
    if (tareaProceso == null) return res.status(404).json({ message: `TareaProcesos nulos` })
    res.status(200).json(tareaProceso)
}

async function createAllTareaProceso(req, res) {
    try {
        /* console.log(req.body); */
        const result = await models.sequelize.transaction(async (t) => {
            const tarea = await models.TareaProceso.create({

                codigoempresa: req.body.codigoempresa,
                fecha: new Date(req.body.fecha),
                idactividad: req.body.idactividad,
                idlabor: req.body.idlabor,
                idestado: 1,
                idcentrocosto: req.body.idcentrocosto,
                turnotareo: req.body.turnotareo,
                fechamod: new Date(req.body.fechamod),
                escampo: req.body.escampo,
                espacking: req.body.espacking,
                esjornal: req.body.esjornal,
                esrendimiento: req.body.esrendimiento,
                horainicio: new Date(req.body.horainicio),
                horafin: new Date(req.body.horafin),
                pausainicio: new Date(req.body.pausainicio),
                pausafin: new Date(req.body.pausafin),
                diasiguiente: req.body.diasiguiente,

                accion: 'I',
                usuario: 0,
                ip: req.ip,
                accion_usuario: 'Creo una nueva tarea completa.',
            }, { transaction: t });

            if (req.body.personal) {
                for (let i = 0; i < req.body.personal.length; i++) {
                    req.body.personal[i].itemtareoproceso=tarea.itemtareoproceso;
                    req.body.personal[i].fechamod= Date.now();
                    req.body.personal[i].cantidadHoras= 2;
                    req.body.personal[i].cantidadrendimiento= 5;
                    req.body.personal[i].cantidadavance= 5;
                    req.body.personal[i].transferidosap= true;
                    req.body.personal[i].idestado= 1;
                    
                    req.body.idactividad=tarea.idactividad;
                    //await models.PersonalTareaProceso.create(req.body.personal[i],{transaction: t})
                }
                await models.PersonalTareaProceso.bulkCreate(req.body.personal, { transaction: t });
            }
            /* trabajador.dataValues.usuario=user; */
            return tarea;
        });
        res.status(200).json(result)

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `Error en el servidor ${error}` })
    }
}

async function updateTareaProceso(req, res) {
    let [err, tareaProceso] = await get(models.TareaProceso.update({
        //all fields to update

        accion: 'U',
        accion_usuario: 'Edito un tareaProceso.',
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
    if (tareaProceso == null) return res.status(404).json({ message: `TareaProcesos nulos` })
    res.status(200).json(tareaProceso[1][0].dataValues)
}

async function uploadFileTareaProceso(req, res) {
    
    let [err, tareaProceso] = await get(models.TareaProceso.update({
        firmasupervisor: req.file.filename,

        accion: 'U',
        accion_usuario: 'Edito un tareaProceso.',
        ip: req.ip,
        usuario: 0
    }, {
        where: {
            itemtareoproceso: req.body.itemtareoproceso
        },
        individualHooks: true,
        validate: false
    }))
    if (err) return res.status(500).json({ message: `${err}` })
    if (tareaProceso == null) return res.status(404).json({ message: `TareaProcesos nulos` })
    res.status(200).json(tareaProceso[1][0].dataValues)
}


async function deleteTareaProceso(req, res) {
    let [err, tareaProceso] = await get(models.TareaProceso.update({
        estado: 'I',

        accion_usuario: 'Elimino un tareaProceso.',
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
    if (tareaProceso == null) return res.status(404).json({ message: `TareaProcesos nulos` })
    res.status(200).json(tareaProceso[1][0].dataValues)
}


function get(promise) {
    return promise.then(data => {
        return [null, data];
    })
        .catch(err => [err]);
}

module.exports = {
    getTareaProcesos,
    getTareaProceso,
    createAllTareaProceso,
    createTareaProceso,
    uploadFileTareaProceso,
    updateTareaProceso,
    deleteTareaProceso
}