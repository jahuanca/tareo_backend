const { get } = require('./../services/utils')
const logger = require('./../config/logger')
const models = require('./../models')


const getPesados = async (req, res) => {
    let query = req.query
    query['estado'] = 'A'
    console.log(query)
    let [err, pesados] = await get(models.Pre_Tarea_Esparrago_Varios.findAll({
        where: query
    }))
    if (err) {
        logger.error(`500 GET getPesados, ${err}.`)
        return res.status(500).json({ message: `${err}` })
    }
    if (pesados == null) {
        logger.error(`404 GET getPesados, valores nulos.`)
        return res.status(404).json({ message: `Pesados nulos` })
    }
    logger.info(`200 GET getPesados, ${pesados.length} items.`)
    res.status(200).json(pesados)
}

const createPesado = async (req, res) => {
    const [err, pesado] = await get(models.Pre_Tarea_Esparrago_Varios.create({
        fecha: req.body.fecha,
        hora: req.body.fecha,
        horainicio: req.body.horainicio,
        horafin: req.body.horafin,
        pausainicio: req.body.pausainicio,
        pausafin: req.body.pausafin,
        linea: 1,
        idcentrocosto: req.body.idcentrocosto,
        idlabor: req.body.idlabor,
        idtipotarea: req.body.idtipotarea,
        codigosupervisor: req.body.codigosupervisor,
        codigodigitador: req.body.codigodigitador,
        fechamod: req.body.fechamod,
        /* activo: true, */
        idusuario: req.body.idusuario,
        idestado: 1,
        estado: 'A',
        turnotareo: req.body.turnotareo,
        diasiguiente: req.body.diasiguiente,

        accion: 'I',
        usuario: 0,
        ip: req.ip,
        accion_usuario: 'Creo un nuevo pesado.',
    }
    ))

    if (err) {
        logger.error(`500 POST createPesado, ${err}.`)
        return res.status(500).json({ message: `${err}` })
    }
    if (pesados == null) {
        logger.error(`404 POST createPesado, valores nulos.`)
        return res.status(404).json({ message: `Pesados nulos` })
    }
    logger.info(`200 POST createPesado, new key: ${pesados.itempretareaesparragovarios}.`)
    res.status(200).json(pesados)
}

const deletePesado = async (req, res) => {
    let [err, pesados] = await get(models.Pre_Tarea_Esparrago_Varios.update({
        estado: 'I',
        accion: 'D',
        usuario: 0,
        ip: req.ip,
        accion_usuario: 'Elimino un pesado.',
    },{
        where: {
            itempretareaesparragovarios: req.params.id
        }
    }))
    if (err) {
        logger.error(`500 DELETE deletePesado, ${err}.`)
        return res.status(500).json({ message: `${err}` })
    }
    if (pesados == null) {
        logger.error(`404 DELETE deletePesado, valores nulos.`)
        return res.status(404).json({ message: `Pesados nulos` })
    }
    logger.info(`200 DELETE deletePesado, ${pesados.length} items.`)
    res.status(200).json(pesados)
}

module.exports = {
    getPesados,
    createPesado,
    deletePesado,
}